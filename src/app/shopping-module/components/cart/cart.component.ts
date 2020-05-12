import { DataTransferService } from './../../../shared/services/data-transfer.service';
import { Router } from '@angular/router';
import { OrderDetails } from './../../../shared/class/OrderDetails';
import { Cart } from './../../../shared/class/Cart';
import { HttpServiceService } from './../../../shared/services/http-service.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SubSink } from 'subsink';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {

  public unsub = new SubSink();

  paymentForm: FormGroup;

  constructor(public service: HttpServiceService, public router: Router, private fb: FormBuilder, public data: DataTransferService) {
  }
  list: Cart[];
  dataList: any[];
  total;
  ngOnInit(): void {
    this.paymentForm = this.fb.group({
      id: [null],
      name: ['', [
        Validators.required,
        Validators.minLength(2)]],
      address: ['', [
        Validators.required,
        Validators.minLength(5)]],
      upiId: [null, Validators.required],
      amount: [null]
    });
    // tslint:disable-next-line: deprecation
    // this.paymentForm.valueChanges.subscribe(console.log);
    this.getCartItems();
  }

  get name() {
    return this.paymentForm.get('name');
  }
  get address() {
    return this.paymentForm.get('address');
  }
  get upi() {
    return this.paymentForm.get('upiId');
  }

  getCartItems() {
    this.service.getCartItems()
      .subscribe(data => {
        console.log('Inside Fetch Items');
        this.list = data;
        this.countTotal();
        console.log('Outside Fetch Items');
      });
  }

  countTotal() {
    this.dataList = [];
    this.total = 0;
    this.list.forEach(item => {
      this.service.getDeatils(item.ProductId)
        .subscribe(data => {
          this.dataList.push(data);
          this.total = this.total + data.Amount;
        });
    });
  }

  deleteItem(id: number) {
    console.log(id);
    this.service.deleteCartItem(id).subscribe(() => {
      console.log(`Fetch Items Called`);
      this.getCartItems();
      console.log(`Fetch Items Ended`);
    },
      err => console.log(`%cError Occured: ${err}` + 'color: red'));
  }

  placeOrder(newOrder: OrderDetails) {
    newOrder.amount = this.total;
    console.log(newOrder);
    this.data.set(newOrder);
    this.router.navigate(['./order/summary']);
  }

  reactive() {
    console.log(this.paymentForm.value);
    this.service.OrderInfo = Object.assign({}, this.paymentForm.value);
    this.service.OrderInfo.amount = this.total;
    console.log(this.service.OrderInfo);
    this.data.set(this.service.OrderInfo);
    this.router.navigate(['./order/summary']);
  }

  reset() {
    console.log('reset called');
    this.paymentForm.reset();
  }
  ngOnDestroy(): void {
    this.unsub.unsubscribe();
  }
}
