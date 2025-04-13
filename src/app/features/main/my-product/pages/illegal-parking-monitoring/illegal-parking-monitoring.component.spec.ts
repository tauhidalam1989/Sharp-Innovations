import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IllegalParkingMonitoringComponent } from './illegal-parking-monitoring.component';

describe('IllegalParkingMonitoringComponent', () => {
  let component: IllegalParkingMonitoringComponent;
  let fixture: ComponentFixture<IllegalParkingMonitoringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IllegalParkingMonitoringComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IllegalParkingMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
