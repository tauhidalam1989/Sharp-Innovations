import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetManagementSystemComponent } from './fleet-management-system.component';

describe('FleetManagementSystemComponent', () => {
  let component: FleetManagementSystemComponent;
  let fixture: ComponentFixture<FleetManagementSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FleetManagementSystemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FleetManagementSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
