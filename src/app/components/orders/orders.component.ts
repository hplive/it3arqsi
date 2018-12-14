import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { OrderService } from './orders.service';
import { Product } from 'src/app/Models/product';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  public orders;

  constructor(private _orderService: OrderService) {
  }

  getOrders() {
    this._orderService.getOrders().subscribe(
      data => { this.orders = data },
      err => console.error(err),
      () => console.log('done loading orders')
    );
  }

  add(name: string, productParentId: number, productParentName: string, depthParent: number, lengthParent : number, heightParent: number, productChildId1: number, productChildName1: string, depthChild1: number, lengthChild1: number, heightChild1: number): void {
    var order: any = {};
    order.name = name;
    order.item = {};
    order.item.id = +productParentId;
    order.item.name = productParentName;
    order.item.depth = +depthParent;
    order.item.length = +lengthParent;
    order.item.height = +heightParent;
    var itemProduct = [];
    itemProduct[0] = {};
    itemProduct[0].id = +productChildId1;
    itemProduct[0].name = productChildName1;
    itemProduct[0].length = +lengthChild1;
    itemProduct[0].height = +heightChild1;
    itemProduct[0].depth = +depthChild1;
    order.itemProduct = itemProduct;
    this._orderService.addOrder(order)
      .subscribe(orders => {
        this.orders.push(orders);
      });
  }

  ngOnInit() {
    this.getOrders();
  }

}
