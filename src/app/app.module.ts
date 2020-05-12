import { CheckoutAuthGuard } from './shared/auth/checkout-auth.guard';
import { DataTransferService } from './shared/services/data-transfer.service';
import { HttpServiceService } from './shared/services/http-service.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Error404Component } from './error404/error404.component';

@NgModule({
  declarations: [
    AppComponent,
    Error404Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [HttpServiceService, DataTransferService, CheckoutAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
