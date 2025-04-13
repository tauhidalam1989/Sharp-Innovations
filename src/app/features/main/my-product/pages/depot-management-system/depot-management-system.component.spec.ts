import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepotManagementSystemComponent } from './depot-management-system.component';

describe('DepotManagementSystemComponent', () => {
  let component: DepotManagementSystemComponent;
  let fixture: ComponentFixture<DepotManagementSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepotManagementSystemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepotManagementSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
