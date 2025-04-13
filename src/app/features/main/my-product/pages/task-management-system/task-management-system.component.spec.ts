import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskManagementSystemComponent } from './task-management-system.component';

describe('TaskManagementSystemComponent', () => {
  let component: TaskManagementSystemComponent;
  let fixture: ComponentFixture<TaskManagementSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskManagementSystemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskManagementSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
