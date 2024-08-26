import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilitiesDetailComponent } from './facilities-detail.component';

describe('FacilitiesDetailComponent', () => {
  let component: FacilitiesDetailComponent;
  let fixture: ComponentFixture<FacilitiesDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FacilitiesDetailComponent]
    });
    fixture = TestBed.createComponent(FacilitiesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
