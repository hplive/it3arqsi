import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from '../../services/message.service';
import { Order } from 'src/app/Models/order';

var urlPath="https://armarioit2.herokuapp.com";

/*const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};*/

/* const proxyurl = 'https://sicgcapi.azurewebsites.net/api/produtos';
 // site that doesn’t send Access-Control-*
fetch(proxyurl) // https://cors-anywhere.herokuapp.com/https://example.com
.then(response => response.text())
.then(contents => console.log(contents))
.catch(() => console.log("Can’t access "  + " response. Blocked by browser?")) */

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/x-www-form-urlencoded',
    'Authorization': 'none',
    'rejectUnauthorized': 'false'
  })
};

@Injectable({ providedIn: 'root' })
export class OrderService {

   private ordersUrl = urlPath+'/api/orders';  // URL to web api
   private orderUrl = urlPath+'/api/order';

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET orders from the server */
  getOrders (): Observable<Order[]> {

     return this.http.get<Order[]>(this.ordersUrl)
       .pipe(
         tap(_ => this.log('fetched orders')),
         catchError(this.handleError('getOrders', []))
       );
  }

  /** GET order by id. Return `undefined` when id not found */
  getOrderNo404<Data>(id: string): Observable<Order> {
    const url = `${this.orderUrl}/?id=${id}`;
    return this.http.get<Order[]>(url)
      .pipe(
        map(orders => orders[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} order id=${id}`);
        }),
        catchError(this.handleError<Order>(`getOrder id=${id}`))
      );
  }

  /** GET order by id. Will 404 if id not found */
  getOrder(id: string): Observable<Order> {
    const url = `${this.orderUrl}/${id}`;
    return this.http.get<Order>(url).pipe(
      tap(_ => console.log(_)),//this.log(_ + `fetched order id=${id}`)),
      catchError(this.handleError<Order>(`getOrder id=${id}`))
    );
  }
  //////// Save methods //////////

  /** POST: add a new order to the server */
  addOrder (order: Order): Observable<Order> {
    return this.http.post<Order>(this.orderUrl, order).pipe(
      tap((order: Order) => this.log(`added order w/ id=${order.id}`)),
      catchError(this.handleError<Order>('addOrder'))
    );
  }

  /** DELETE: delete the order from the server */
   deleteOrder (order: any): Observable<Order> {
    const id = typeof order === 'number' ? order : order._id;
    const url = `${this.orderUrl}/${id}`;

    return this.http.delete<Order>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted order id=${id}`)),
      catchError(this.handleError<Order>('deleteOrder'))
    );
  }

  /** PUT: update the order on the server */
  updateOrder (order: any): Observable<any> {
    const url = `${this.orderUrl}/${order._id}`;
    delete order._id;
    return this.http.put(url, order).pipe(
      tap(_ => this.log(`update order id=${order.id}`)),
      catchError(this.handleError<any>('updateOrder'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a OrderService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`OrderService: ${message}`);
  }
}