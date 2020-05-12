import { GetIPService } from './../shared/services/get-ip.service';
import { DataTransferService } from './../shared/services/data-transfer.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpServiceService } from './../shared/services/http-service.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingModuleRoutingModule } from './shopping-module-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { ComponentsComponent } from './components/components.component';
import { DetailsComponent } from './components/details/details.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CartComponent } from './components/cart/cart.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';


@NgModule({
  declarations: [NavbarComponent, ComponentsComponent, DetailsComponent, DashboardComponent, CartComponent, WishlistComponent],
  imports: [
    CommonModule,
    ShoppingModuleRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    HttpServiceService,
    DataTransferService,
    GetIPService
  ]
})
export class ShoppingModuleModule { }
