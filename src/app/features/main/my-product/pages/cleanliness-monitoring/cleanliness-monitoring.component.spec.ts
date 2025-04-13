import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CleanlinessMonitoringComponent } from './cleanliness-monitoring.component';

describe('CleanlinessMonitoringComponent', () => {
  let component: CleanlinessMonitoringComponent;
  let fixture: ComponentFixture<CleanlinessMonitoringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CleanlinessMonitoringComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CleanlinessMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
