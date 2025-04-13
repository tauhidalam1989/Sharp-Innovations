import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HumanResourceManagementSystemComponent } from './human-resource-management-system.component';

describe('HumanResourceManagementSystemComponent', () => {
  let component: HumanResourceManagementSystemComponent;
  let fixture: ComponentFixture<HumanResourceManagementSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HumanResourceManagementSystemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HumanResourceManagementSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
