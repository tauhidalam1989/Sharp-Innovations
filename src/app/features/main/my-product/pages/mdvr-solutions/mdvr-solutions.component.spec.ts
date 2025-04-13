import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdvrSolutionsComponent } from './mdvr-solutions.component';

describe('MdvrSolutionsComponent', () => {
  let component: MdvrSolutionsComponent;
  let fixture: ComponentFixture<MdvrSolutionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdvrSolutionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MdvrSolutionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
