import { Cart } from './../class/Cart';
import { Movie } from './../class/Movie';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from '../class/Book';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  // tslint:disable-next-line: variable-name
  constructor(private _http: HttpClient) { }

  baseURL = 'http://localhost:3000';

  getAllProducts(): Observable<any[]> {
    return this._http.get<any[]>(`${this.baseURL}/products`);
  }

  getAllMovies(): Observable<Movie[]> {
    return this._http.get<Movie[]>(`${this.baseURL}/products`, this.httpHeader).pipe(
      map(data => data.filter(items => items.Category === 'Movie'))
    );
  }

  getAllBooks(): Observable<Book[]> {
    return this._http.get<Book[]>(`${this.baseURL}/products`, this.httpHeader).pipe(
      map(data => data.filter(items => items.Category === 'Book'))
    );
  }

  getDeatils(id): Observable<any> {
    return this._http.get<any>(`${this.baseURL}/products/${id}`);
  }

  getCartItems(): Observable<any> {
    return this._http.get<any>(`${this.baseURL}/cart`);
  }

  getCartItem(id: number): Observable<any> {
    console.log(`Finding Cart Item`);
    return this._http.get(`${this.baseURL}/cart/${id}`);
  }

  addToCart(Inid: number): Observable<any> {
    let cartItem: Cart;
    this.getCartItem(Inid).subscribe(data => { cartItem = data; }, () => { console.log('Item Not Found LOL'); });
    if (cartItem) {
      console.log(`InsideUpdate`);
      cartItem.quantity++;
      return this._http.put(`${this.baseURL}/cart/${Inid}`, cartItem, this.httpHeader);
    }
    else {
      console.log(`InsideAdd`);
      cartItem = {
        id: Inid,
        ProductId: Math.floor(Math.random() * 100000),
        quantity: 1
      };
      return this._http.post(`${this.baseURL}/cart`, cartItem, this.httpHeader);
    }
  }
  // getMovieDetails(id): Observable<Movie> {
  //   return this._http.get<Movie>(`${this.baseURL}/products/${id}`);
  // }
}