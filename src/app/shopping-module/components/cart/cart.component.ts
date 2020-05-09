import { HttpServiceService } from './../../../shared/services/http-service.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {

  public unsub = new SubSink();

  constructor(public service: HttpServiceService) { }
  list: any[];
  dataList: any[] = [];
  total = 0;
  ngOnInit(): void {
    this.getCartItems();
  }

  getCartItems() {
    this.service.getCartItems()
      .subscribe(data => {
        this.list = data;
        this.countTotal();
      });
  }

  countTotal() {
    this.list.forEach(item => {
      this.service.getDeatils(item.id)
        .subscribe(data => {
          this.dataList.push(data);
          this.total = this.total + data.Amount;
        });
    });
  }

  ngOnDestroy(): void {
    this.unsub.unsubscribe();
  }
}
