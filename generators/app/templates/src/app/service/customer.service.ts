import { Injectable } from '@angular/core';
import {Customer} from '../model/customer';

@Injectable()
export class CustomerService {

  constructor() { }

  get(id : number) : Promise<Customer> {
    let customer = new Customer();
    customer.id = 123;
    customer.nameOfCompagny = 'Mo Pizza';
    return Promise.resolve(customer);
  }

}
