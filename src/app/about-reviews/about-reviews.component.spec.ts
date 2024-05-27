import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutReviewsComponent } from './about-reviews.component';

describe('AboutReviewsComponent', () => {
  let component: AboutReviewsComponent;
  let fixture: ComponentFixture<AboutReviewsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboutReviewsComponent]
    });
    fixture = TestBed.createComponent(AboutReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
