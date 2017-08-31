import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import {Customer} from '../model/customer';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CustomerService {

  constructor(private http : Http) { }

  get(id : number) : Promise<Customer> {
    return this.http.get('./assets/mockHttp/customer.json')
      .toPromise()
      .then( res => res.json() as Customer )
      .catch( error => {
        console.error( 'Impossible de mettre a jour l actualite ', error );
        throw error;
      } );
  }

}
