// import { HttpServiceService } from './../../shared/services/http-service.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  public unsub = new SubSink();

  constructor() { }

  count: number;

  ngOnInit(): void {
    // this.getCartCount();
  }
  // getCartCount() {
  //   this.service.getCartItems()
  //     .subscribe(data => {
  //       this.count = data.length;
  //       // console.log(this.count);
  //     });
  // }

  ngOnDestroy(): void {
    this.unsub.unsubscribe();
  }
}
