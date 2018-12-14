import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }   from './components/dashboard/dashboard.component';
import { HeroesComponent }      from './components/heroes/heroes.component';
import { HeroDetailComponent }  from './components/hero-detail/hero-detail.component';
import { ProductDetailComponent }  from './components/productdetail/productdetail.component';
import { ProductsComponent }      from './components/products/products.component';
import { AggregationComponent }      from './components/aggregations/aggregations.component';
import { AggregationDetailComponent } from './components/aggregationdetail/aggregationdetail.component';
import { OrdersComponent } from './components/orders/orders.component';
import { OrderDetailComponent } from './components/orderdetail/orderdetail.component';
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: ProductDetailComponent },
  { path: 'heroes', component: HeroesComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'aggregations', component: AggregationComponent },
  { path: 'detail/:id1/:id2', component: AggregationDetailComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'orderdetail/:_id', component: OrderDetailComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
