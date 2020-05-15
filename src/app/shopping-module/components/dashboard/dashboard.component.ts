import { WishList } from './../../../shared/class/WishList';
import { GetIPService } from './../../../shared/services/get-ip.service';
import { Movie } from './../../../shared/class/Movie';
import { Book } from './../../../shared/class/Book';
import { HttpServiceService } from './../../../shared/services/http-service.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SubSink } from 'subsink';
import { Cart } from 'src/app/shared/class/Cart';
import { ToastrService } from 'ngx-toastr';
import { DataTransferService } from 'src/app/shared/services/data-transfer.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  // tslint:disable-next-line: variable-name
  constructor(public service: HttpServiceService,
    private _router: Router,
    private _ip: GetIPService,
    private _tost: ToastrService,
    public data: DataTransferService) { }

  Products: any[];
  cartItems: Cart[];
  IP;
  Wish: WishList;
  pageSize = 8;
  p = 1;
  total;

  public unsub = new SubSink();

  ngOnInit(): void {
    this.getProducts();
    this.getIP();
    this.data.remove();
  }

  getProducts() {
    this.service.getAllProducts()
      .subscribe(data => {
        this.Products = data;
        this.total = data.length;
      });
  }

  getBooks() {
    this.service.getAllBooks()
      .subscribe(res => {
        this.Products = res;
        this.total = res.length;
      });
  }

  getMovies() {
    this.service.getAllMovies()
      .subscribe(res => {
        this.Products = res;
        this.total = res.length;
      });
  }

  goToDetails(id: number) {
    // console.log('Clicked' + id);
    this._router.navigate([`./catalog/details/${id}`]);
  }

  getCartItems() {
    // console.log('cart Items called');
    this.service.getCartItems()
      .subscribe(data => {
        this.cartItems = data;
        // console.log(this.cartItems);
      });
    // console.log(this.cartItems);
  }

  // Add or Update Quantity of Products in Cart
  addToCart(Inid: number, itemId: number) {
    // Checking if product is In-stock or not
    if (this.Products[Inid].Quantity > 0) {
      console.log(this.Products[Inid].Quantity);
      try {
        // If not in Cart yet
        this.service.getCartItemByProductId(itemId).subscribe(res => {
          // console.log(res);
          if (res.length === 0) {
            // console.log('%c Does Not Exist', 'background: yellow, color: green');
            // console.log('Product ID: ' + this.Products[Inid].id);
            this.service.addToCart(this.Products[Inid].id).subscribe(() => {
              // console.log('Successfully Added to Cart');
              this.Products[Inid].Quantity--;
              this.service.updateProduct(this.Products[Inid]).subscribe(() => {
                this._tost.success(`${this.Products[Inid].Name} Added`, `Quantity in Cart: 1`);
                // console.log('Cart Quantity Successfully Decreased');
              });
            });
          }
          else {
            // console.log('%c Exist', 'background: blue, color: red');
            // console.log(res[0]);
            // console.log(res[0].quantity);
            res[0].quantity++;
            this.service.updateToCart(res[0]).subscribe(() => {
              // console.log('Cart Quantity Increased');
              this.Products[Inid].Quantity--;
              this.service.updateProduct(this.Products[Inid]).subscribe(() => {
                this._tost.success(`${this.Products[Inid].Name} + 1`, `Quantity in Cart: ${res[0].quantity}`);
                // console.log('Cart Quantity Successfully Decreased');
              });
            });
          }
        });
      }
      catch{
        alert('There seems to be an issue with the server, Please try ahain later');
      }
    }
  }

  getIP() {
    return this._ip.getIP().subscribe(res => this.IP = res);
  }

  addToFav(thisid: number) {
    // console.log('Clicked');
    // console.log(this.IP.ip);
    // console.log(thisid);
    this.service.getWishListSpecific(this.IP.ip, thisid).subscribe(res => {
      if (res.length > 0) {
        this._tost.info('Already in the WishList');
        console.log('Already In the WishList');
      }
      else {
        // console.log('Not in Wish');
        this.Wish = {
          id: Math.floor(Math.random() * 100000),
          productID: thisid,
          ip: this.IP.ip
        }
        this.service.addToWish(this.Wish).subscribe(() => this._tost.success('Added to WishList'));
      }
    });
  }

  ngOnDestroy(): void {
    this.unsub.unsubscribe();
  }
}
