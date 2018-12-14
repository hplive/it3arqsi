import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


import { MessageService } from '../../services/message.service';
import { Aggregation } from 'src/app/Models/aggregation';

var urlPath="http://sicit1api.azurewebsites.net"

/*const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};*/

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/x-www-form-urlencoded',
    'Authorization': 'none',
    'rejectUnauthorized': 'false'
  })
};

@Injectable({ providedIn: 'root' })
export class AggregationService {

  private aggregationUrl = urlPath+'/api/aggregation';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET Aggregations from the server */
  getAggregations (): Observable<Aggregation[]> {

    //return this.http.get<Aggregations[]>(this.aggregationUrl);
    return this.http.get<Aggregation[]>(this.aggregationUrl)
      .pipe(
        tap(_ => this.log('fetched Aggregations')),
        catchError(this.handleError('getAggregations', []))
      );
  }

  /** GET Aggregations by id. Return `undefined` when id not found */
  getAggregationNo404<Data>(id: number): Observable<Aggregation> {
    const url = `${this.aggregationUrl}/?id=${id}`;
    return this.http.get<Aggregation[]>(url)
      .pipe(
        map(aggregation => aggregation[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} Aggregations id=${id}`);
        }),
        catchError(this.handleError<Aggregation>(`getAggregation id=${id}`))
      );
  }

  /** GET Aggregations by id. Will 404 if id not found */
  getAggregation(id1: number, id2: number): Observable<Aggregation> {
    const url = `${this.aggregationUrl}/${id1}/${id2}`;
    return this.http.get<Aggregation>(url).pipe(
      tap(_ => this.log(`fetched Aggregation idFather=${id1} idChild= ${id2}`)),
      catchError(this.handleError<Aggregation>(`getAggregation idFather=${id1} idChild=${id2}`))
    );
  }

  //////// Save methods //////////

  /** POST: add a new Aggregation to the server */
  addAggregation (aggregation: Aggregation): Observable<Aggregation> {
    return this.http.post<Aggregation>(this.aggregationUrl, aggregation).pipe(
      tap((aggregation: Aggregation) => this.log(`added Aggregation`)),
      catchError(this.handleError<Aggregation>('addAggregation'))
    );
  }

  /** DELETE: delete the Aggregations from the server */
   deleteAggregation (aggregation: Aggregation): Observable<Aggregation> {
    const id1 = aggregation[0].productParent;
    const id2 = aggregation[0].productChild;

    const url = `${this.aggregationUrl}/${id1}/${id2}`;

    return this.http.delete<Aggregation>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted Aggregation id=${id1}/${id2}`)),
      catchError(this.handleError<Aggregation>('deleteAggregation'))
    );
  }

  /** PUT: update the Aggregations on the server */
  updateAggregation (aggregation: Aggregation): Observable<Aggregation> {
    const id1 = aggregation[0].productParent;
    const id2 = aggregation[0].productChild;
    const url = `${this.aggregationUrl}/${id1}/${id2}`;
    return this.http.put(url, aggregation[0]).pipe(
      tap(_ => this.log(`updated Aggregations id1=${id1}/${id2}`)),
      catchError(this.handleError<any>('updateAggregation'))
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

  /** Log a AggregationService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`AggregationService: ${message}`);
  }
}