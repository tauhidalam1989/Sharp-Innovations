import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NOCComponent } from './noc.component';

describe('NOCComponent', () => {
  let component: NOCComponent;
  let fixture: ComponentFixture<NOCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NOCComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NOCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
