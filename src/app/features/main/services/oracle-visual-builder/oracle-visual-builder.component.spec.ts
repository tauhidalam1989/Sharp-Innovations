import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OracleVisualBuilderComponent } from './oracle-visual-builder.component';

describe('OracleVisualBuilderComponent', () => {
  let component: OracleVisualBuilderComponent;
  let fixture: ComponentFixture<OracleVisualBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OracleVisualBuilderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OracleVisualBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
