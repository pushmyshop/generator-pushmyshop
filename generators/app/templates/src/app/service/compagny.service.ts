import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import {Compagny} from '../model/compagny';
import { environment } from '../../environments/environment';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CompagnyService {

  constructor(private http : Http) { }

  get() : Promise<Compagny> {
    return this.http.get(environment.compagnyUrl)
      .toPromise()
      .then( res => res.json() as Compagny )
      .catch( error => {
        console.error( 'Could not get information on the compagnie ', error );
        throw error;
      } );
  }

}
