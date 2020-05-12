import { Error404Component } from './error404/error404.component';
import { CheckoutAuthGuard } from './shared/auth/checkout-auth.guard';
import { ShoppingModuleModule } from './shopping-module/shopping-module.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    // Eager Loading Module
    path: 'catalog',
    loadChildren: () => ShoppingModuleModule
  },
  {
    // Redirect Route
    path: '',
    redirectTo: '/catalog',
    pathMatch: 'full'
  },
  {
    // Lazy Loading Module
    path: 'order',
    loadChildren: () => import('./checkout/checkout.module').then(m => m.CheckoutModule),
    canActivateChild: [CheckoutAuthGuard]
  },
  {
    path: '**',
    component: Error404Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
