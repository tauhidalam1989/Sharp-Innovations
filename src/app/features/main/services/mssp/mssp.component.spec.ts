import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MSSPComponent } from './mssp.component';

describe('MSSPComponent', () => {
  let component: MSSPComponent;
  let fixture: ComponentFixture<MSSPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MSSPComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MSSPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
