import { GetIPService } from './../../../shared/services/get-ip.service';
import { Router } from '@angular/router';
import { WishList } from './../../../shared/class/WishList';
import { HttpServiceService } from './../../../shared/services/http-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  wishList: WishList[] = [];
  data: any[] = [];
  ip;
  constructor(public http: HttpServiceService, private _router: Router, private _ip: GetIPService, public service: HttpServiceService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this._ip.getIP().subscribe(res => {
      this.ip = res;
      this.getWishList(this.ip.ip);
    });
  }
  getWishList(ip) {
    this.http.getWishList(ip).subscribe(res => {
      this.wishList = res;
      console.log(this.wishList);
      res.forEach(item => {
        this.getDetails(item.productID);
      });
    });
  }
  getDetails(itemid: number) {
    this.data = [];
    this.http.getDeatils(itemid).subscribe(res => {
      this.data.push(res);
    });
  }
  goToDetails(id: number) {
    this._router.navigate([`../catalog/details/${id}`]);
  }

  deleteWish(id: number) {
    this.http.deleteWishItem(id).subscribe(() => {
      this.getAll();
    });
  }
  addToCart(i: number, Inid: number) {
    if (this.data[i].Quantity > 0) {
      console.log(this.data[i].Quantity);
      try {
        this.service.getCartItemByProductId(Inid).subscribe(res => {
          console.log(res);
          if (res.length === 0) {
            this.service.addToCart(this.data[i].id).subscribe(() => {
              this.data[i].Quantity--;
              this.service.updateProduct(this.data[i]).subscribe(() => {
              });
            });
          }
          else {
            res[0].quantity++;
            this.service.updateToCart(res[0]).subscribe(() => {
              this.data[i].Quantity--;
              this.service.updateProduct(this.data[i]).subscribe(() => {
              });
            });
          }
        });
      }
      catch{
        alert('There seems to be an issue with the server, Please try ahain later');
      }
    }
  }

}
