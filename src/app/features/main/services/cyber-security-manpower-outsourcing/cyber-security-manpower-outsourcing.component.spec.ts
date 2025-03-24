import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CyberSecurityManpowerOutsourcingComponent } from './cyber-security-manpower-outsourcing.component';

describe('CyberSecurityManpowerOutsourcingComponent', () => {
  let component: CyberSecurityManpowerOutsourcingComponent;
  let fixture: ComponentFixture<CyberSecurityManpowerOutsourcingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CyberSecurityManpowerOutsourcingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CyberSecurityManpowerOutsourcingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
