import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../service/customer.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  title : string;
  constructor(private customerService : CustomerService) { }

  ngOnInit() {
    this.customerService.get(123).then(customer => {
      this.title = customer.nameOfCompagny;
    })
  }

}
