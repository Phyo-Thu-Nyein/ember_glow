import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreCreateInvoiceComponent } from './pre-create-invoice.component';

describe('PreCreateInvoiceComponent', () => {
  let component: PreCreateInvoiceComponent;
  let fixture: ComponentFixture<PreCreateInvoiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreCreateInvoiceComponent]
    });
    fixture = TestBed.createComponent(PreCreateInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
