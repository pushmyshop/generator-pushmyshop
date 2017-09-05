import { Component, OnInit } from '@angular/core';
import {Cart} from './model/cart'
import {CartService} from './service/cart.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  cart : Cart;

  constructor(private cartService : CartService){ }

  ngOnInit() {
    this.cartService.current.subscribe(cart => this.cart = cart);
    this.cartService.init();
  }
}
