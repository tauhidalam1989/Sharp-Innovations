import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebAppDevelopmentComponent } from './web-app-development.component';

describe('WebAppDevelopmentComponent', () => {
  let component: WebAppDevelopmentComponent;
  let fixture: ComponentFixture<WebAppDevelopmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebAppDevelopmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebAppDevelopmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
