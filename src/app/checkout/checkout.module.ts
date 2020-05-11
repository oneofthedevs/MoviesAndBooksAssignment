import { DataTransferService } from './../shared/services/data-transfer.service';
import { HttpServiceService } from './../shared/services/http-service.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { ComponentsComponent } from './components/components.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { PaymentGatewayComponent } from './components/payment-gateway/payment-gateway.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [NavbarComponent, ComponentsComponent, OrderSummaryComponent, PaymentGatewayComponent],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    HttpServiceService,
    DataTransferService
  ]
})
export class CheckoutModule { }
