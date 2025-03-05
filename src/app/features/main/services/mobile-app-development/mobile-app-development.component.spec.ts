import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileAppDevelopmentComponent } from './mobile-app-development.component';

describe('MobileAppDevelopmentComponent', () => {
  let component: MobileAppDevelopmentComponent;
  let fixture: ComponentFixture<MobileAppDevelopmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileAppDevelopmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileAppDevelopmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
