import { PaymentGatewayComponent } from './components/payment-gateway/payment-gateway.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { ComponentsComponent } from './components/components.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: ComponentsComponent,
    children: [
      {
        path: 'summary',
        component: OrderSummaryComponent
      },
      {
        path: '',
        redirectTo: 'summary',
        pathMatch: 'full'
      },
      {
        path: 'payment',
        component: PaymentGatewayComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutRoutingModule { }
