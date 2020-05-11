import { OrderDetails } from './../class/OrderDetails';
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

  public OrderInfo: OrderDetails = {
    id: null,
    name: '',
    address: '',
    upiId: '',
    amount: 0,
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

  getCartItem(id: number): Observable<Cart> {
    console.log(`Finding Cart Item`);
    return this._http.get<Cart>(`${this.baseURL}/cart/${id}`);
  }

  addToCart(Inid: number): Observable<Cart> {
    let cartItem: Cart;
    console.log(`InsideAdd`);
    cartItem = {
      id: Math.floor(Math.random() * 100000),
      ProductId: Inid,
      quantity: 1
    };
    return this._http.post<Cart>(`${this.baseURL}/cart`, cartItem, this.httpHeader);
  }

  deleteCartItem(id): Observable<Cart> {
    return this._http.delete<Cart>(`${this.baseURL}/cart/${id}`, this.httpHeader);
  }

}
