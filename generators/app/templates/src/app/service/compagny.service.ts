import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import {Compagny} from '../model/compagny';
import { environment } from '../../environments/environment';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';
import {Cart} from "../model/cart";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class CompagnyService {

  current : BehaviorSubject<Compagny> = new BehaviorSubject<Compagny>(null);
  constructor(private http : Http) { }

  init() : void{
    this.http.get(environment.compagnyUrl)
      .map( res => {
        let company = res.json() as Compagny;
        this.current.next(company);
      })
      .toPromise()
      .catch( error => {
        console.error( 'Could not get information on the compagny ', error );
        throw error;
      } );
  }

}
