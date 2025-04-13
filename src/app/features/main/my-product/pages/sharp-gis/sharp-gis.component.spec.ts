import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharpGisComponent } from './sharp-gis.component';

describe('SharpGisComponent', () => {
  let component: SharpGisComponent;
  let fixture: ComponentFixture<SharpGisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharpGisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharpGisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
