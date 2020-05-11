import { Router } from '@angular/router';
import { Cart } from './../../../shared/class/Cart';
import { DataTransferService } from './../../../shared/services/data-transfer.service';
import { OrderDetails } from './../../../shared/class/OrderDetails';
import { HttpServiceService } from './../../../shared/services/http-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit {

  constructor(public serivce: HttpServiceService, public data: DataTransferService, private _router: Router) { }

  sum: OrderDetails;
  cartItems: Cart[];
  itemData: any[];
  ngOnInit(): void {
    this.sum = this.data.get();
    console.log(this.sum);
    this.getCartItems();
  }

  getCartItems() {
    this.serivce.getCartItems().subscribe(data => {
      this.cartItems = data;
      this.getItemData();
    });
  }

  getItemData() {
    this.itemData = [];
    this.cartItems.forEach(item => {
      this.serivce.getDeatils(item.ProductId).subscribe(data => {
        console.log(data);
        this.itemData.push(data);
      }
      );
    });
    console.log(this.itemData);
  }

  place() {
    this.data.set(this.sum);
    this._router.navigate(['./order/payment']);
  }

}
