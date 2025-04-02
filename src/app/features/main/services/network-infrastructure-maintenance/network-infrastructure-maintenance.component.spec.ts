import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkInfrastructureMaintenanceComponent } from './network-infrastructure-maintenance.component';

describe('NetworkInfrastructureMaintenanceComponent', () => {
  let component: NetworkInfrastructureMaintenanceComponent;
  let fixture: ComponentFixture<NetworkInfrastructureMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NetworkInfrastructureMaintenanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NetworkInfrastructureMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
