import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { Cart } from '../model/cart';
import { Product } from '../model/product';
import { environment } from '../../environments/environment';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import "rxjs/add/operator/map";

@Injectable()
export class CartService {

  current : BehaviorSubject<Cart> = new BehaviorSubject<Cart>(null);
  private headers = new Headers( { 'Content-Type': 'application/json' } );
  
  constructor(private http : Http) { }

  init() : void{
    let currentCart : Cart = JSON.parse(localStorage.getItem('cart'));
    if(currentCart){
      return this.current.next(currentCart);
    }
  }

  addProduct(product : Product) : Promise<Cart> {
    return this.getCart().then(cart => {
      return this.addProductTo(cart, product);
    })
  }

  removeProduct(product : Product): Promise<Cart>{
    let cart : Cart = JSON.parse(localStorage.getItem('cart'));
    return this.http.post(environment.compagnyUrl+'/carts/'+cart.id+'/product/'+product.id, JSON.stringify(product), { headers: this.headers } )
    .map( res => {
      let cart = res.json() as Cart;
      localStorage.setItem('cart', JSON.stringify(cart));
      this.current.next(cart);
      return cart;
    })
    .toPromise()
    .catch( error => {
      console.error( 'Could not add product to cart', error );
      return Promise.reject( error.message || error );
    } );
  }


  private getCart(): Promise<Cart> {
    let currentCart : Cart = JSON.parse(localStorage.getItem('cart'));
    if(!currentCart){
      return this.create();
    }
    return Promise.resolve(currentCart);
  }

  private addProductTo(cart: Cart, product : Product): Promise<Cart>{
    return this.http.post(environment.compagnyUrl+'/carts/'+cart.id+'/product', JSON.stringify(product), { headers: this.headers } )
    .map( res => {
      let cart = res.json() as Cart;
      localStorage.setItem('cart', JSON.stringify(cart));
      this.current.next(cart);
      return cart;
    })
    .toPromise()
    .catch( error => {
      console.error( 'Could not add product to cart', error );
      return Promise.reject( error.message || error );
    } );
  }

  private create() : Promise<Cart> {
    return this.http.post(environment.compagnyUrl+'/carts', {})
      .map( res => {
        let cart = res.json() as Cart;
        localStorage.setItem('cart', JSON.stringify(cart));
        this.current.next(cart);
        return cart;
      })
      .toPromise()
      .catch( error => {
        console.error( 'Could not create new cart', error );
        return Promise.reject( error.message || error );
      } );
  }

}
