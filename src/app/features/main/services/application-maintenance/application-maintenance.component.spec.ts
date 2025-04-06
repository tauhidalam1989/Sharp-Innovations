import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationMaintenanceComponent } from './application-maintenance.component';

describe('ApplicationMaintenanceComponent', () => {
  let component: ApplicationMaintenanceComponent;
  let fixture: ComponentFixture<ApplicationMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationMaintenanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
