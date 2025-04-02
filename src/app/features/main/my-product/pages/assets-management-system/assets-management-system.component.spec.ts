import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsManagementSystemComponent } from './assets-management-system.component';

describe('AssetsManagementSystemComponent', () => {
  let component: AssetsManagementSystemComponent;
  let fixture: ComponentFixture<AssetsManagementSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetsManagementSystemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetsManagementSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
