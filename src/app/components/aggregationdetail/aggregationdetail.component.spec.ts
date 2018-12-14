import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AggregationDetailComponent } from './aggregationdetail.component';

describe('AggregationdetailComponent', () => {
  let component: AggregationDetailComponent;
  let fixture: ComponentFixture<AggregationDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AggregationDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AggregationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
