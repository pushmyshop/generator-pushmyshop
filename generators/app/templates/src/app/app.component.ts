import { Component, OnInit } from '@angular/core';
import {Cart} from './model/cart'
import {CartService} from './service/cart.service'
import {Compagny} from "./model/compagny";
import {CompagnyService} from "./service/compagny.service";
import {Angulartics2GoogleTagManager} from "angulartics2";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  cart : Cart;
  compagny: Compagny;

  constructor(private _cartService : CartService
              , private _compagnyService: CompagnyService
              , private _angulartics2GoogleTagManager: Angulartics2GoogleTagManager)//necessary to hook the router for analytics
  { }

  ngOnInit() {
    this._compagnyService.current.subscribe(compagny => this.compagny = compagny);
    this._compagnyService.init();
    this._cartService.current.subscribe(cart => this.cart = cart);
    this._cartService.init();
  }
}
