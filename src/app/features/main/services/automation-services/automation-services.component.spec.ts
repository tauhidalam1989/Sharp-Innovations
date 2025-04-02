import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomationServicesComponent } from './automation-services.component';

describe('AutomationServicesComponent', () => {
  let component: AutomationServicesComponent;
  let fixture: ComponentFixture<AutomationServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutomationServicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutomationServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
