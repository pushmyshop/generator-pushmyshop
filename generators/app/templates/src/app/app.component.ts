import { Component, OnInit } from '@angular/core';
import {Cart} from './model/cart'
import {CartService} from './service/cart.service'
import {Compagny} from "./model/compagny";
import {CompagnyService} from "./service/compagny.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  cart : Cart;
  compagny: Compagny;

  constructor(private cartService : CartService, private compagnyService: CompagnyService){ }

  ngOnInit() {
    this.compagnyService.current.subscribe(compagny => this.compagny = compagny);
    this.compagnyService.init();
    this.cartService.current.subscribe(cart => this.cart = cart);
    this.cartService.init();
  }
}
