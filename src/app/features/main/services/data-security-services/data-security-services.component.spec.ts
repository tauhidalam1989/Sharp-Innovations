import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSecurityServicesComponent } from './data-security-services.component';

describe('DataSecurityServicesComponent', () => {
  let component: DataSecurityServicesComponent;
  let fixture: ComponentFixture<DataSecurityServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataSecurityServicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataSecurityServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
