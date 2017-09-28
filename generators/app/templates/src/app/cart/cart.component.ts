import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { CompagnyService } from '../service/compagny.service';

import { Cart } from '../model/cart'
import { Product } from '../model/product'
import { Compagny } from '../model/compagny'
import { CartService } from '../service/cart.service'
import {MdDialog} from "@angular/material";
import {OrderDialog} from "../order/order.component";
import {OfflineDialog} from "../offline/offline.component";
import {Subscription} from "rxjs/Subscription";


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

  cart: Cart;
  compagny: Compagny;
  lastOrder : Cart;
  private cartSubscription: Subscription;
  private compagnySubscription: Subscription;

  constructor(private cartService: CartService
              , private compagnyService: CompagnyService
              , private dialog: MdDialog) { }

  ngOnInit() {
    this.cartSubscription = this.cartService.current.subscribe(cart => this.cart = cart);
    this.cartService.init();
    this.compagnySubscription = this.compagnyService.current.subscribe(compagny => this.compagny = compagny);
    this.lastOrder = this.cartService.getLastOrder();
  }

  ngOnDestroy(){
    if(!this.cartSubscription.closed){
      this.cartSubscription.unsubscribe()
    }

    if(!this.compagnySubscription.closed){
      this.compagnySubscription.unsubscribe()
    }
  }

  removeProduct(product: Product): void {
    if(navigator.onLine){
      this.cartService.removeProduct(product);
    }else {
      OfflineDialog.alertOffline(this.dialog, this.compagny);
    }
  }

  openReservation(): void {
    if(navigator.onLine){
      let dialogRef = this.dialog.open(OrderDialog, {
        panelClass : "order-dialog",
        data: { cart: this.cart, compagny : this.compagny }
      });

      dialogRef.afterClosed().subscribe(value => {
        if(!this.cart){
          this.switch();
        }
      })
    }else {
      OfflineDialog.alertOffline(this.dialog, this.compagny);
    }
  }

  switch(){
    if(this.cart === this.lastOrder){
      this.cart = this.cartService.current.getValue();
    }else {
      this.cart = this.lastOrder;
    }
  }
}
