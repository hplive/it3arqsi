import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './product.service';
import { Product } from 'src/app/Models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public products;

  constructor(private _productService: ProductService) {
  }

  getProducts() {
    this._productService.getProducts().subscribe(
      data => { this.products = data },
      err => console.error(err),
      () => console.log('done loading products')
    );
  }

  add(name: string, price: number, depthmin: number, depthmax: number, lengthmin : number, lengthmax: number, heightmin: number, heightmax: number): void {
    var product: Product = new Product;
    product.name = name;
    product.price = price;
    product.depthMin = depthmin;
    product.depthMax = depthmax;
    product.lengthMin = lengthmin;
    product.lengthMax = lengthmax;
    product.heightMin = heightmin;
    product.heightMax = heightmax;
    this._productService.addProduct(product)
      .subscribe(products => {
        this.products.push(products);
      });
  }

  ngOnInit() {
    this.getProducts();
  }

}
