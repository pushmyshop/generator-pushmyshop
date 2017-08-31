import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CustomerService } from './service/customer.service';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';

import { Routes, RouterModule } from '@angular/router';


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
    CartComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpModule
  ],
  providers: [CustomerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
