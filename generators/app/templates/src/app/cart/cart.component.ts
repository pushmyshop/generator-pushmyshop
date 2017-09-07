import { Component, OnInit, ViewChild } from '@angular/core';

import {Cart} from '../model/cart'
import {Product} from '../model/product'
import {CartService} from '../service/cart.service'
import {PopinComponent} from '../popin/popin.component'


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart : Cart;
  
  @ViewChild('reservation') reservation : PopinComponent;
  @ViewChild('validation') validation : PopinComponent;

  constructor(private cartService : CartService){ }

  ngOnInit() {
    this.cartService.current.subscribe(cart => this.cart = cart);
    this.cartService.init();
  }

  removeProduct(product : Product) : void {
    this.cartService.removeProduct(product);
  }

  validerReservation(){
    this.cartService.validateCart(this.cart).then(cart =>{
      this.closeReservation();
      this.openValidation();
    })
  }
  
  openValidation(){
    this.validation.open();
  }
  
  openReservation(){
    this.reservation.open();
  }

  closeReservation(){
    this.reservation.close();
  }
}
