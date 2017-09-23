import { Component, OnInit, ViewChild } from '@angular/core';
import { CompagnyService } from '../service/compagny.service';

import { Cart } from '../model/cart'
import { Product } from '../model/product'
import { Compagny } from '../model/compagny'
import { CartService } from '../service/cart.service'
import { PopinComponent } from '../popin/popin.component'
import { PushService } from "../service/push.service";


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart: Cart;
  compagny: Compagny;

  @ViewChild('reservation') reservation: PopinComponent;
  @ViewChild('validation') validation: PopinComponent;

  constructor(private cartService: CartService, private pushService: PushService, private compagnyService: CompagnyService) { }

  ngOnInit() {
    this.cartService.current.subscribe(cart => this.cart = cart);
    this.cartService.init();
    this.compagnyService.current.subscribe(compagny => this.compagny = compagny);
  }

  removeProduct(product: Product): void {
    this.cartService.removeProduct(product);
  }

  validerReservation() {
    this.cartService.validateCart(this.cart).then(cart => {
      this.closeReservation();
      this.openValidation();
      this.pushService.subscribeToPush(this.cart);
    })
  }

  openValidation() {
    this.validation.open();
  }

  openReservation() {
    this.reservation.open();
  }

  closeReservation() {
    this.reservation.close();
  }
}
