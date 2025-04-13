import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PpeMonitoringComponent } from './ppe-monitoring.component';

describe('PpeMonitoringComponent', () => {
  let component: PpeMonitoringComponent;
  let fixture: ComponentFixture<PpeMonitoringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PpeMonitoringComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PpeMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
