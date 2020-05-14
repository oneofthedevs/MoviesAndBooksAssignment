import { DataTransferService } from './../../../shared/services/data-transfer.service';
import { HttpServiceService } from './../../../shared/services/http-service.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-payment-gateway',
  templateUrl: './payment-gateway.component.html',
  styleUrls: ['./payment-gateway.component.scss']
})
export class PaymentGatewayComponent implements OnInit {

  OTP: FormGroup;
  constructor(private _router: Router,
    private _http: HttpServiceService,
    public data: DataTransferService,
    public fb: FormBuilder,
    public toast: ToastrService) { }

  flag = 0;
  ngOnInit(): void {
    this.OTP = this.fb.group({
      pin: ['',
        [
          Validators.required,
          Validators.maxLength(6),
          Validators.minLength(6)
        ]
      ]
    });
  }

  get pin() {
    return this.OTP.get('pin');
  }
  confirm() {
    if (this.OTP.value.pin === '778899') {
      this._http.getCartItems().subscribe(res => {
        res.forEach(item => {
          this._http.deleteCartItem(item.id);
        });
        this.toast.success('Order successfully placed', `Order id: ${Math.floor(Math.random() * 10000)}`)
        this._router.navigate(['']);
      });
    }
    else {
      this.flag = 1;
    }
  }
  cancel() {
    this.data.remove();
    this._router.navigate(['']);
  }

}
