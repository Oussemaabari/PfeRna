import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RespDepotDashboardComponent } from './resp-depot-dashboard.component';

describe('RespDepotDashboardComponent', () => {
  let component: RespDepotDashboardComponent;
  let fixture: ComponentFixture<RespDepotDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RespDepotDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RespDepotDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
