import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Order }         from '../../Models/order';
import { OrderService }  from '../orders/orders.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './orderdetail.component.html',
  styleUrls: [ './orderdetail.component.css' ]
})
export class OrderDetailComponent implements OnInit {
  @Input() order: Order;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getOrder();
  }

  getOrder(): void {
    const id = this.route.snapshot.paramMap.get('_id');
    this.orderService.getOrder(id.toString())
      .subscribe(data => this.order = data);
  }


  goBack(): void {
    this.location.back();
  }

 save(): void {
    this.orderService.updateOrder(this.order)
      .subscribe(() => this.goBack());
  }

  delete(): void {
    this.orderService.deleteOrder(this.order)
      .subscribe(() => this.goBack());
  }
}