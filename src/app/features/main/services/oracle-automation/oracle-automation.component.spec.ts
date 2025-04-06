import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OracleAutomationComponent } from './oracle-automation.component';

describe('OracleAutomationComponent', () => {
  let component: OracleAutomationComponent;
  let fixture: ComponentFixture<OracleAutomationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OracleAutomationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OracleAutomationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
