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
  constructor(public service: HttpServiceService, private _router: Router) { }

  Products: any[];
  Movies: Movie[];
  Books: Book[];
  cartItems: Cart[];

  public unsub = new SubSink();
  ngOnInit(): void {
    this.getProducts();
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

  goToDetails(id: number) {
    console.log('Clicked' + id);
    this._router.navigate([`./details/${id}`]);
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

  ngOnDestroy(): void {
    this.unsub.unsubscribe();
  }
  // getMovies() {
  //   this.service.getAllMovies().subscribe(data => {
  //     this.Movies = data;
  //     console.log(this.Movies);
  //   });
  // }

  // getBooks() {
  //   this.service.getAllBooks().subscribe(data => {
  //     this.Books = data;
  //     console.log(this.Books);
  //   });
  // }
}
