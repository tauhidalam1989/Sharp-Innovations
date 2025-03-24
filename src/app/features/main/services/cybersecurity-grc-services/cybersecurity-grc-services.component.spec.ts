import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CybersecurityGRCServicesComponent } from './cybersecurity-grc-services.component';

describe('CybersecurityGRCServicesComponent', () => {
  let component: CybersecurityGRCServicesComponent;
  let fixture: ComponentFixture<CybersecurityGRCServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CybersecurityGRCServicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CybersecurityGRCServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
