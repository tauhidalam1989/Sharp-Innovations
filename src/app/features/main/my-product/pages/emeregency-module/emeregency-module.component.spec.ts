import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmeregencyModuleComponent } from './emeregency-module.component';

describe('EmeregencyModuleComponent', () => {
  let component: EmeregencyModuleComponent;
  let fixture: ComponentFixture<EmeregencyModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmeregencyModuleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmeregencyModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
