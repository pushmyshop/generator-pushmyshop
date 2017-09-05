import { Component, OnInit } from '@angular/core';

import {Cart} from '../model/cart'
import {CartService} from '../service/cart.service'


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart : Cart;
  
    constructor(private cartService : CartService){ }
  
    ngOnInit() {
      this.cartService.current.subscribe(cart => this.cart = cart);
      this.cartService.init();
    }

}
