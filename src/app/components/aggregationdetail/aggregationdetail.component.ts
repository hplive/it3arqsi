import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Aggregation } from 'src/app/Models/aggregation';
import { AggregationService }  from '../aggregations/aggregation.service';

@Component({
  selector: 'app-aggregationdetail',
  templateUrl: './aggregationdetail.component.html',
  styleUrls: [ './aggregationdetail.component.css' ]
})
export class AggregationDetailComponent implements OnInit {
  @Input() aggregation: Aggregation;

  constructor(
    private route: ActivatedRoute,
    private aggregationService: AggregationService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getAggregation();
  }

  getAggregation(): void {
    const id1 = +this.route.snapshot.paramMap.get('id1');
    const id2 = +this.route.snapshot.paramMap.get('id2');
    this.aggregationService.getAggregation(id1, id2)
      .subscribe(aggregation => this.aggregation = aggregation);
  }

  goBack(): void {
    this.location.back();
  }

 save(): void {
    this.aggregationService.updateAggregation(this.aggregation)
      .subscribe(() => this.goBack());
  }

  delete(): void {
    this.aggregationService.deleteAggregation(this.aggregation)
      .subscribe(() => this.goBack());
  }
}