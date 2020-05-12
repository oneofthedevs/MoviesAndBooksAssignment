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
  constructor(public http: HttpServiceService, private _router: Router, private _ip: GetIPService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this._ip.getIP().subscribe(res => {
      this.ip = res;
      console.log(this.ip);
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
      console.log(this.data);
    });
  }
  getDetails(itemid: number) {
    this.data = [];
    this.http.getDeatils(itemid).subscribe(res => {
      this.data.push(res);
      console.log(res);
    });
  }
  goToDetails(id: number) {
    this._router.navigate([`../catalog/details/${id}`]);
  }

  deleteWish(id: number) {
    this.http.deleteWishItem(id).subscribe(() => {
      this.getWishList(this.ip);
    });
  }

}
