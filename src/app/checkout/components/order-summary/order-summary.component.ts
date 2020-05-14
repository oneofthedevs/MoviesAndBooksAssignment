import { Router } from '@angular/router';
import { Cart } from './../../../shared/class/Cart';
import { DataTransferService } from './../../../shared/services/data-transfer.service';
import { OrderDetails } from './../../../shared/class/OrderDetails';
import { HttpServiceService } from './../../../shared/services/http-service.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit, OnDestroy {

  public unsub = new SubSink();

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
      console.log(this.cartItems);
      this.getItemData();
    });
  }

  getItemData() {
    this.itemData = [];
    this.cartItems.forEach((item, i) => {
      this.serivce.getDeatils(item.ProductId).subscribe(data => {
        console.log(data);
        data.Amount = data.Amount * this.cartItems[i].quantity;
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

  goBack() {
    this.data.remove();
    this._router.navigate(['../catalog/cart']);
  }

  ngOnDestroy(): void {
    this.unsub.unsubscribe();
  }

}
