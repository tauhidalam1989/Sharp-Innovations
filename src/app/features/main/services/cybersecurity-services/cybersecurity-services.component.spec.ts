import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CybersecurityServicesComponent } from './cybersecurity-services.component';

describe('CybersecurityServicesComponent', () => {
  let component: CybersecurityServicesComponent;
  let fixture: ComponentFixture<CybersecurityServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CybersecurityServicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CybersecurityServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
