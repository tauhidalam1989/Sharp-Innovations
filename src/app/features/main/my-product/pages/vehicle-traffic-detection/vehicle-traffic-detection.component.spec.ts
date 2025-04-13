import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleTrafficDetectionComponent } from './vehicle-traffic-detection.component';

describe('VehicleTrafficDetectionComponent', () => {
  let component: VehicleTrafficDetectionComponent;
  let fixture: ComponentFixture<VehicleTrafficDetectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleTrafficDetectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleTrafficDetectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
