import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreServiceComponent } from './core-service.component';

describe('CoreServiceComponent', () => {
  let component: CoreServiceComponent;
  let fixture: ComponentFixture<CoreServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoreServiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoreServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
