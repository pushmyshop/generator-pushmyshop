import {Component, Inject, OnInit} from '@angular/core';
import { CompagnyService } from '../service/compagny.service';
import { ProductService } from '../service/product.service';
import { CartService } from '../service/cart.service';
import { Product } from '../model/product';
import { Compagny } from '../model/compagny';

import {MD_DIALOG_DATA, MdDialog, MdDialogRef} from "@angular/material";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: Product[];
  compagny: Compagny;

  constructor(private compagnyService: CompagnyService
    , private productService: ProductService
    , private cartService: CartService
    , private dialog: MdDialog) {
    this.products = [];
  }

  ngOnInit() {
    this.compagnyService.current.subscribe(compagny => this.compagny = compagny);
    this.productService.get().then(products => {
      this.products = products;
    })
  }

  addToCart(product) {
    this.cartService.addProduct(product).then(cart => {
      this.openDialog(product);
    });
  }

  private openDialog(product : Product): void {
    let dialogRef = this.dialog.open(ProductAddedDialog, {
      width: '250px',
      data: { name: product.name }
    });
  }
}

@Component({
  selector: 'product-added-dialog',
  template : '<h1 md-dialog-title>Ajouté au panier ! <a class="close" (click)="close()">&times;</a></h1>\n' +
            '<div md-dialog-content>\n' +
            '  <p><span class="product-name">{{data.name}}</span> a été ajouté(e) au panier.</p>' +
            '</div>',
  styles : ['.close {\n' +
            '  float: right;\n' +
            '  transition: all 200ms;\n' +
            '  font-size: 30px;\n' +
            '  font-weight: bold;\n' +
            '  text-decoration: none;\n' +
            '  color: #333;\n' +
            '}',

            '.close:hover {\n' +
            '  color: #06D85F;\n' +
            '}',

            '.product-name {\n' +
            '  font-weight: bold;\n' +
            '}'
            ]
})
export class ProductAddedDialog {
  constructor(private dialogRef: MdDialogRef<ProductAddedDialog>
    ,@Inject(MD_DIALOG_DATA) public data: any) {}

  close(): void {
    this.dialogRef.close();
  }
}
