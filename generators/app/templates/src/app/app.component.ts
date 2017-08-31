import { Component, OnInit } from '@angular/core';
import { CustomerService } from './service/customer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title;

  constructor(private customerService : CustomerService){ }

  ngOnInit() {
    this.customerService.get(123).then(customer => {
      this.title = customer.nameOfCompagny;
    })
  }
}
