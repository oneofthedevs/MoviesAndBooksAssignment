import { Movie } from './../../../shared/class/Movie';
import { Book } from './../../../shared/class/Book';
import { HttpServiceService } from './../../../shared/services/http-service.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  constructor(public service: HttpServiceService, private _router: Router) { }

  Products: any[];
  Movies: Movie[];
  Books: Book[];

  public unsub = new SubSink();
  ngOnInit(): void {
    this.getProducts();
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

  addToCart(id: number) {
    console.log(id);
    this.service.addToCart(id).subscribe();
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
