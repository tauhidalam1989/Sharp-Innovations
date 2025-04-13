import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleCollisionDetectionComponent } from './vehicle-collision-detection.component';

describe('VehicleCollisionDetectionComponent', () => {
  let component: VehicleCollisionDetectionComponent;
  let fixture: ComponentFixture<VehicleCollisionDetectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleCollisionDetectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleCollisionDetectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
