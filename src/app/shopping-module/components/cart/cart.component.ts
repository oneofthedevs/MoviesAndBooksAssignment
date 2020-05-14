import { DataTransferService } from './../../../shared/services/data-transfer.service';
import { Router } from '@angular/router';
import { OrderDetails } from './../../../shared/class/OrderDetails';
import { Cart } from './../../../shared/class/Cart';
import { HttpServiceService } from './../../../shared/services/http-service.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      upiId: [null,
        [Validators.required,
        Validators.pattern('[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}')]],
      amount: [null, Validators.min(1)]
    });
    this.data.remove();
    this.getCartItems();
  }
  // Reactive From stuff
  get name() {
    return this.paymentForm.get('name');
  }
  get address() {
    return this.paymentForm.get('address');
  }
  get upiId() {
    return this.paymentForm.get('upiId');
  }

  // Database Functions
  // Getting all items from cart DB
  getCartItems() {
    this.service.getCartItems()
      .subscribe(data => {
        this.list = data;
        this.countTotal();
      });
  }

  // Counting total amount
  countTotal() {
    this.dataList = [];
    this.total = 0;
    this.list.forEach(item => {
      this.service.getDeatils(item.ProductId)
        .subscribe(data => {
          this.dataList.push(data);
          this.total = this.total + (data.Amount * item.quantity);
        });
    });
  }

  // Delete item from cart
  deleteItem(id: number, quantity: number) {
    this.service.getCartItem(id).subscribe(res => {
      this.service.getDeatils(res.ProductId).subscribe(data => {
        data.Quantity = data.Quantity + quantity;
        this.service.updateProduct(data).subscribe(() => {
          this.service.deleteCartItem(res.id).subscribe(() => {
            this.getCartItems();
          });
        });
      });
    });
  }

  minusItem(id: number) {
    this.service.getCartItem(id).subscribe(res => {
      if (res.quantity === 1) {
        console.log('Quantity One Called');
        this.service.getDeatils(res.ProductId).subscribe(data => {
          data.Quantity++;
          console.log('Main Stock: ' + data.Quantity);
          this.service.updateProduct(data).subscribe(() => {
            this.service.deleteCartItem(res.id).subscribe(() => {
              this.getCartItems();
            })
          });
        });
      }
      else {
        console.log('Quantity More Called');
        res.quantity--;
        this.service.updateToCart(res).subscribe(() => {
          console.log('Cart Updated')
          this.service.getDeatils(res.ProductId).subscribe(item => {
            item.Quantity++;
            console.log('Main Stock: ' + item.Quantity);
            this.service.updateProduct(item).subscribe(() => {
              this.getCartItems();
            });
          });
        });
      }
    });
  }

  plusItem(id: number) {
    this.service.getCartItem(id).subscribe(res => {
      res.quantity++;
      this.service.updateToCart(res).subscribe(() => {
        this.service.getDeatils(res.ProductId).subscribe(item => {
          item.Quantity--;
          this.service.updateProduct(item).subscribe(() => {
            this.getCartItems();
          });
        });
      });
    });
  }

  reactive() {
    if (this.total === 0) {
      alert('No Items in Cart');
    }
    else {
      console.log(this.paymentForm.value);
      this.service.OrderInfo = Object.assign({}, this.paymentForm.value);
      this.service.OrderInfo.amount = this.total;
      console.log(this.service.OrderInfo);
      this.data.set(this.service.OrderInfo);
      this.router.navigate(['./order/summary']);
    }
  }

  // Reset order details
  reset() {
    console.log('reset called');
    this.paymentForm.reset();
  }
  ngOnDestroy(): void {
    this.unsub.unsubscribe();
  }
}
