import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyServicesLayoutComponent } from './my-services-layout.component';

describe('MyServicesLayoutComponent', () => {
  let component: MyServicesLayoutComponent;
  let fixture: ComponentFixture<MyServicesLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyServicesLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyServicesLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
