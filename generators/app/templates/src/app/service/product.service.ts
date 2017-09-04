import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { Product } from '../model/product';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProductService {

  constructor(private http : Http) { }

  get() : Promise<Product[]> {
    return this.http.get(environment.compagnyUrl+'/products')
      .toPromise()
      .then( res => res.json()._embedded.products as Product[] )
      .catch( error => {
        console.error( 'Could not get information on the products', error );
        throw error;
      } );
  }

}
