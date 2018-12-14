import { Component, OnInit } from '@angular/core';
import { AggregationService } from './aggregation.service';
import { Aggregation } from 'src/app/Models/aggregation';

@Component({
  selector: 'app-aggregations',
  templateUrl: './aggregations.component.html',
  styleUrls: ['./aggregations.component.css']
})
export class AggregationComponent implements OnInit {

  public aggregations;

  constructor(private _aggregationService: AggregationService) {
  }

  getAggregations() {
    this._aggregationService.getAggregations().subscribe(
      data => { this.aggregations = data },
      err => console.error(err),
      () => console.log('done loading aggregations')
    );
  }

  add(productParent: number, productChild: number, minPercentage: number, maxPercentage: number, type : boolean, sameMaterialRequired: boolean): void {
    var aggregation: Aggregation = new Aggregation;
    aggregation.ProductParentId = productParent;
    aggregation.ProductChildId = productChild;
    aggregation.minPercentage = minPercentage;
    aggregation.maxPercentage = maxPercentage;
    aggregation.type = type;
    aggregation.sameMaterialRequired = sameMaterialRequired;
    this._aggregationService.addAggregation(aggregation)
      .subscribe(aggregations => {
        ;
      });
  }

  ngOnInit() {
    this.getAggregations();
  }

}
