import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkInfrastructureServicesComponent } from './network-infrastructure-services.component';

describe('NetworkInfrastructureServicesComponent', () => {
  let component: NetworkInfrastructureServicesComponent;
  let fixture: ComponentFixture<NetworkInfrastructureServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NetworkInfrastructureServicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NetworkInfrastructureServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
