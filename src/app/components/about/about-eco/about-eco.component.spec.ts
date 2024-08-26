import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutEcoComponent } from './about-eco.component';

describe('AboutEcoComponent', () => {
  let component: AboutEcoComponent;
  let fixture: ComponentFixture<AboutEcoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboutEcoComponent]
    });
    fixture = TestBed.createComponent(AboutEcoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
