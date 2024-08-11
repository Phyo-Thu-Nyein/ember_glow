import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllInvoicesComponent } from './all-invoices.component';

describe('AllInvoicesComponent', () => {
  let component: AllInvoicesComponent;
  let fixture: ComponentFixture<AllInvoicesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllInvoicesComponent]
    });
    fixture = TestBed.createComponent(AllInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
