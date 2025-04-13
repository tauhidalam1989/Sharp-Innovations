import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PotholesDetectionComponent } from './potholes-detection.component';

describe('PotholesDetectionComponent', () => {
  let component: PotholesDetectionComponent;
  let fixture: ComponentFixture<PotholesDetectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PotholesDetectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PotholesDetectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
