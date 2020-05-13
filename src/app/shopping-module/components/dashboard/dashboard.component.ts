import { WishList } from './../../../shared/class/WishList';
import { GetIPService } from './../../../shared/services/get-ip.service';
import { Movie } from './../../../shared/class/Movie';
import { Book } from './../../../shared/class/Book';
import { HttpServiceService } from './../../../shared/services/http-service.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SubSink } from 'subsink';
import { Cart } from 'src/app/shared/class/Cart';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  // tslint:disable-next-line: variable-name
  constructor(public service: HttpServiceService, private _router: Router, private _ip: GetIPService) { }

  Products: any[];
  cartItems: Cart[];
  IP;
  Wish: WishList;

  public unsub = new SubSink();
  ngOnInit(): void {
    this.getProducts();
    this.getIP();
    console.log(this.service.OrderInfo);
    // this.getCartItems();
    // this.getMovies();
  }

  getProducts() {
    this.service.getAllProducts()
      .subscribe(data => {
        this.Products = data;
        console.log(this.Products);
      });
  }

  getBooks() {
    this.service.getAllBooks()
      .subscribe(res => {
        this.Products = res;
      });
  }

  getMovies() {
    this.service.getAllMovies()
      .subscribe(res => {
        this.Products = res;
      });
  }

  goToDetails(id: number) {
    console.log('Clicked' + id);
    this._router.navigate([`./catalog/details/${id}`]);
  }

  getCartItems() {
    console.log('cart Items called');
    this.service.getCartItems()
      .subscribe(data => {
        this.cartItems = data;
        console.log(this.cartItems);
      });
    console.log(this.cartItems);
  }

  // Add or Update Quantity of Products in Cart
  addToCart(Inid: number, itemId: number) {
    if (this.Products[Inid].Quantity > 0) {
      console.log(this.Products[Inid].Quantity);
      try {
        this.service.getCartItemByProductId(itemId).subscribe(res => {
          console.log(res);
          if (res.length === 0) {
            console.log('%c Does Not Exist', 'background: yellow, color: green');
            console.log('Product ID: ' + this.Products[Inid].id);
            this.service.addToCart(this.Products[Inid].id).subscribe(() => {
              console.log('Successfully Added to Cart');
              this.Products[Inid].Quantity--;
              this.service.updateProduct(this.Products[Inid]).subscribe(() => {
                console.log('Cart Quantity Successfully Decreased');
              });
            });
          }
          else {
            console.log('%c Exist', 'background: blue, color: red');
            console.log(res[0]);
            console.log(res[0].quantity);
            res[0].quantity++;
            this.service.updateToCart(res[0]).subscribe(() => {
              console.log('Cart Quantity Increased');
              this.Products[Inid].Quantity--;
              this.service.updateProduct(this.Products[Inid]).subscribe(() => {
                console.log('Cart Quantity Successfully Decreased');
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
    this.Wish = {
      id: Math.floor(Math.random() * 100000),
      productID: thisid,
      ip: this.IP.ip
    };
    console.log(this.Wish);
    this.service.addToWish(this.Wish).subscribe(() => console.log('Added to WishList'));
  }

  ngOnDestroy(): void {
    this.unsub.unsubscribe();
  }
}
