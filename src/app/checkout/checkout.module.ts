import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { ComponentsComponent } from './components/components.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { PaymentGatewayComponent } from './components/payment-gateway/payment-gateway.component';


@NgModule({
  declarations: [NavbarComponent, ComponentsComponent, OrderSummaryComponent, PaymentGatewayComponent],
  imports: [
    CommonModule,
    CheckoutRoutingModule
  ]
})
export class CheckoutModule { }
