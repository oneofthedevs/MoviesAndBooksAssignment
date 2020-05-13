import { WishList } from './../../../shared/class/WishList';
import { GetIPService } from './../../../shared/services/get-ip.service';
import { HttpServiceService } from './../../../shared/services/http-service.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {

  public unsub = new SubSink();

  constructor(public activatedRoute: ActivatedRoute, public service: HttpServiceService, private _ip: GetIPService) { }

  id: number;
  details: any;
  IP;
  Wish: WishList;
  ngOnInit(): void {
    this.getId();
    this.getDetails(this.id);
    this.getIP();
  }
  getId() {
    // tslint:disable-next-line: radix
    this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
  }
  getIP() {
    return this._ip.getIP().subscribe(res => this.IP = res);
  }

  addToFav(thisid: number) {
    console.log('Clicked');
    console.log(this.IP.ip);
    console.log(thisid);
    this.service.getWishListSpecific(this.IP.ip, thisid).subscribe(res => {
      if (res.length > 0) {
        console.log('Already In the WishList');
      }
      else {
        console.log('Not in Wish');
        // this.Wish = {
        //   id: Math.floor(Math.random() * 100000),
        //   productID: thisid,
        //   ip: this.IP.ip
        // }
        // this.service.addToWish(this.Wish).subscribe();
      }
    })
    // this.Wish = {
    //   id: Math.floor(Math.random() * 100000),
    //   productID: thisid,
    //   ip: this.IP.ip
    // };
    // console.log(this.Wish);
    // this.service.addToWish(this.Wish).subscribe(() => console.log('Added to WishList'));
  }


  getDetails(id: number) {
    this.service.getDeatils(id)
      .subscribe(data => {
        this.details = data;
        console.log(this.details);
      });
  }

  // Add or Update Quantity of Products in Cart
  addToCart(itemId: number) {
    console.log(itemId);
    if (this.details.Quantity > 0) {
      console.log(this.details.Quantity);
      try {
        this.service.getCartItemByProductId(itemId).subscribe(res => {
          console.log(res);
          if (res.length === 0) {
            console.log('%c Does Not Exist', 'background: yellow, color: green');
            console.log('Product ID: ' + this.details.id);
            this.service.addToCart(this.details.id).subscribe(() => {
              console.log('Successfully Added to Cart');
              this.details.Quantity--;
              this.service.updateProduct(this.details).subscribe(() => {
                console.log('Cart Quantity Successfully Decreased');
              });
            });
          }
          else {
            console.log('%c Exist', 'background: blue, color: red');
            console.log(res[0]);
            console.log(res[0].quantity);
            res[0].quantity++;
            this.service.updateToCart(res[0]).subscribe(() => {
              console.log('Cart Quantity Increased');
              this.details.Quantity--;
              this.service.updateProduct(this.details).subscribe(() => {
                console.log('Cart Quantity Successfully Decreased');
              });
            });
          }
        });
      }
      catch {
        alert('There seems to be an issue with the server, Please try ahain later');
      }
    }
  }

  ngOnDestroy(): void {
    this.unsub.unsubscribe();
  }
}
