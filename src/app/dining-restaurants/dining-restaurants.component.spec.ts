import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiningRestaurantsComponent } from './dining-restaurants.component';

describe('DiningRestaurantsComponent', () => {
  let component: DiningRestaurantsComponent;
  let fixture: ComponentFixture<DiningRestaurantsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiningRestaurantsComponent]
    });
    fixture = TestBed.createComponent(DiningRestaurantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
