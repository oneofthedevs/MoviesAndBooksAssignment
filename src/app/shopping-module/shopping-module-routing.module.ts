import { CartComponent } from './components/cart/cart.component';
import { ComponentsComponent } from './components/components.component';
import { DetailsComponent } from './components/details/details.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: ComponentsComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
      },
      {
        path: 'details/:id',
        component: DetailsComponent
      },
      {
        path: 'cart',
        component: CartComponent
      },
      {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingModuleRoutingModule { }
