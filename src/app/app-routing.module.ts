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
    loadChildren: () => import('./checkout/checkout.module').then(m => m.CheckoutModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
