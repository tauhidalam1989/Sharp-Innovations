import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmoServicesComponent } from './pmo-services.component';

describe('PmoServicesComponent', () => {
  let component: PmoServicesComponent;
  let fixture: ComponentFixture<PmoServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PmoServicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PmoServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
