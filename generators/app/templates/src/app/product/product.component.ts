import { Component, OnInit, ViewChild } from '@angular/core';
import { CompagnyService } from '../service/compagny.service';
import { ProductService } from '../service/product.service';
import { CartService } from '../service/cart.service';
import { Product } from '../model/product';
import { PopinComponent } from '../popin/popin.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  title : string;
  products : Product[];
  lastProductAdded : Product;

  @ViewChild('productAdded') productAdded : PopinComponent;

  constructor(private compagnyService : CompagnyService
    , private productService : ProductService
    , private cartService : CartService) {
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

  addToCart(product){
    this.cartService.addProduct(product).then(cart => {
      this.lastProductAdded = product;
      this.productAdded.open();
    });
  }

  closeProductAdded(){
    this.productAdded.close();
  }
}
