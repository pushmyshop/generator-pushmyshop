import { Component, OnInit } from '@angular/core';
import { CompagnyService } from '../service/compagny.service';
import { ProductService } from '../service/product.service';
import { Product } from '../model/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  title : string;
  products : Product[];

  constructor(private compagnyService : CompagnyService, private productService : ProductService) {
    this.products = []; 
  }

  ngOnInit() {
    this.compagnyService.get().then(compagny => {
      this.title = compagny.name;
    })
    this.productService.get().then(products => {
      this.products = products;
    })
  }

}
