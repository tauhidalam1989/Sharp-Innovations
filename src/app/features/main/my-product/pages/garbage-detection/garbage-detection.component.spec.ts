import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GarbageDetectionComponent } from './garbage-detection.component';

describe('GarbageDetectionComponent', () => {
  let component: GarbageDetectionComponent;
  let fixture: ComponentFixture<GarbageDetectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GarbageDetectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GarbageDetectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
