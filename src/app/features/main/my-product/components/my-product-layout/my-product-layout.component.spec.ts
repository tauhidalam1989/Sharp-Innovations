import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProductLayoutComponent } from './my-product-layout.component';

describe('MyProductLayoutComponent', () => {
  let component: MyProductLayoutComponent;
  let fixture: ComponentFixture<MyProductLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyProductLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyProductLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
