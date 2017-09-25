import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { DateTimePickerModule } from 'ng-pick-datetime';
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import {ProductAddedDialog, ProductComponent} from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { PopinComponent } from './popin/popin.component';


import { CompagnyService } from './service/compagny.service';
import { ProductService } from './service/product.service';
import { CartService } from './service/cart.service';

import { Routes, RouterModule } from '@angular/router';
import {PushService} from "./service/push.service";
import {MaterialModule} from "./material.module";


export const routes: Routes = [
  { path: '',
    redirectTo: '/product',
    pathMatch: 'full'
  },
  { path: 'product', component: ProductComponent },
  { path: 'cart', component: CartComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    CartComponent,
    PopinComponent,
    ProductAddedDialog
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpModule,
    FormsModule,
    DateTimePickerModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    CompagnyService,
    ProductService,
    CartService,
    PushService,
  ],
  entryComponents: [
    ProductAddedDialog
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
