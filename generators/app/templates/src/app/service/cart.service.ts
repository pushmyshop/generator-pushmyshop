import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { Cart } from '../model/cart';
import { Product } from '../model/product';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CartService {

  current : Observable<Cart>;
  private headers = new Headers( { 'Content-Type': 'application/json' } );
  
  constructor(private http : Http) { }

  addProduct(product : Product) : Promise<Cart> {
    return this.getCart().then(cart => {
      return this.addProductTo(cart, product);
    })
  }

  private getCart(): Promise<Cart> {
    let currentCart : Cart = JSON.parse(localStorage.getItem('cart'));
    if(!currentCart){
      return this.create();
    }
    return Promise.resolve(currentCart);
  }

  private addProductTo(cart: Cart, product : Product): Promise<Cart>{
    this.current = this.http.post(environment.compagnyUrl+'/carts/'+cart.id+'/product', JSON.stringify(product), { headers: this.headers } )
    .map( res => {
      let cart = res.json() as Cart;
      localStorage.setItem('cart', JSON.stringify(cart));
      return cart;
    })
    .catch( error => {
      console.error( 'Could not add product to cart', error );
      return Observable.throw( error.message || error );
    } );
    return this.current.toPromise();
  }

  private create() : Promise<Cart> {
    this.current = this.http.post(environment.compagnyUrl+'/carts', {})
      .map( res => {
        let cart = res.json() as Cart;
        localStorage.setItem('cart', JSON.stringify(cart));
        return cart;
      })
      .catch( error => {
        console.error( 'Could not create new cart', error );
        return Observable.throw( error.message || error );
      } );
      return this.current.toPromise();
  }

}
