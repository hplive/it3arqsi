import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './services/in-memory-data.service';

import { AppRoutingModule }     from './app-routing.module';

import { AppComponent }         from './app.component';
import { DashboardComponent }   from './components/dashboard/dashboard.component';
import { HeroDetailComponent }  from './components/hero-detail/hero-detail.component';
import { HeroesComponent }      from './components/heroes/heroes.component';
import { HeroSearchComponent }  from './components/hero-search/hero-search.component';
import { MessagesComponent }    from './components/messages/messages.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailComponent } from './components/productdetail/productdetail.component';
import { AggregationComponent } from './components/aggregations/aggregations.component';
import { AggregationDetailComponent } from './components/aggregationdetail/aggregationdetail.component';
import { OrdersComponent } from './components/orders/orders.component';
import { OrderDetailComponent } from './components/orderdetail/orderdetail.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    HeroSearchComponent,
    ProductsComponent,
    ProductDetailComponent,
    AggregationComponent,
    AggregationDetailComponent,
    OrdersComponent,
    OrderDetailComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }