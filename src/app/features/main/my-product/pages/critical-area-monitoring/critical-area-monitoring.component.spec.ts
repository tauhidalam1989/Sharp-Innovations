import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriticalAreaMonitoringComponent } from './critical-area-monitoring.component';

describe('CriticalAreaMonitoringComponent', () => {
  let component: CriticalAreaMonitoringComponent;
  let fixture: ComponentFixture<CriticalAreaMonitoringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriticalAreaMonitoringComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriticalAreaMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
