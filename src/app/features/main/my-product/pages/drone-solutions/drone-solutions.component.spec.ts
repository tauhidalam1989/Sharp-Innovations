import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DroneSolutionsComponent } from './drone-solutions.component';

describe('DroneSolutionsComponent', () => {
  let component: DroneSolutionsComponent;
  let fixture: ComponentFixture<DroneSolutionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DroneSolutionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DroneSolutionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
