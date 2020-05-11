import { OrderDetails } from './../class/OrderDetails';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {

  constructor() { }

  PaymentData: OrderDetails;

  set(details: OrderDetails) {
    this.PaymentData = details;
    localStorage.setItem('OrderDetails', JSON.stringify(this.PaymentData));
  }

  get() {
    this.PaymentData = JSON.parse(localStorage.getItem('OrderDetails'));
    return this.PaymentData;
  }

  remove() {
    localStorage.removeItem('OrderDetails');
  }
}
