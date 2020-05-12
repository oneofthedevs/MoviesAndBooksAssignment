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
  Movies: Movie[];
  Books: Book[];
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

  addToCart(Inid: number) {
    console.log(Inid);
    // this.cartItems = this.cartItems.filter(ele => {
    //   ele.id === Inid;
    // });
    // console.log(this.cartItems);
    this.service.addToCart(Inid).subscribe();
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
