import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Product }         from '../../Models/product';
import { ProductService }  from '../products/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './productdetail.component.html',
  styleUrls: [ './productdetail.component.css' ]
})
export class ProductDetailComponent implements OnInit {
  @Input() product: Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.productService.getProduct(id)
      .subscribe(product => this.product = product);
  }

  goBack(): void {
    this.location.back();
  }

 save(): void {
    this.productService.updateProduct(this.product)
      .subscribe(() => this.goBack());
  }

  delete(): void {
    this.productService.deleteProduct(this.product)
      .subscribe(() => this.goBack());
  }
}