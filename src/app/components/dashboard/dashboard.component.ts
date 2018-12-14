import { Component, OnInit } from '@angular/core';
import { Hero } from '../../hero';
import { HeroService } from '../../services/hero.service';
import { ProductService } from '../products/product.service';
import { Product } from 'src/app/Models/product';
import { Aggregation } from 'src/app/Models/aggregation';
import { AggregationService } from '../aggregations/aggregation.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  products: Product[] = [];
  aggregations: Aggregation[] = [];

  constructor(private heroService: HeroService,
    private productService: ProductService,
    private aggregationService: AggregationService) { }

  ngOnInit() {
    this.getHeroes();
    this.getProducts();
    this.getAggregations();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }

  getProducts(): void {
    this.productService.getProducts()
      .subscribe(products => this.products = products);
  }

  getAggregations(): void {
    this.aggregationService.getAggregations()
      .subscribe(aggregations => this.aggregations = aggregations);
  }
}
