import { Component, OnInit, ViewChild } from '@angular/core';
import { CompagnyService } from '../service/compagny.service';

import { Cart } from '../model/cart'
import { Product } from '../model/product'
import { Compagny } from '../model/compagny'
import { CartService } from '../service/cart.service'
import {MdDialog} from "@angular/material";
import {OrderDialog} from "../order/order.component";
import {OfflineDialog} from "../offline/offline.component";


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart: Cart;
  compagny: Compagny;

  constructor(private cartService: CartService
              , private compagnyService: CompagnyService
              , private dialog: MdDialog) { }

  ngOnInit() {
    this.cartService.current.subscribe(cart => this.cart = cart);
    this.cartService.init();
    this.compagnyService.current.subscribe(compagny => this.compagny = compagny);
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
      this.dialog.open(OrderDialog, {
        panelClass : "order-dialog",
        data: { cart: this.cart, compagny : this.compagny }
      });
    }else {
      OfflineDialog.alertOffline(this.dialog, this.compagny);
    }
  }
}
