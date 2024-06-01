import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToStockModalComponent } from './add-to-stock-modal.component';

describe('AddToStockModalComponent', () => {
  let component: AddToStockModalComponent;
  let fixture: ComponentFixture<AddToStockModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddToStockModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddToStockModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
