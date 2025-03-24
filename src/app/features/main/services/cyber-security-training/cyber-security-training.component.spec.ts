import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CyberSecurityTrainingComponent } from './cyber-security-training.component';

describe('CyberSecurityTrainingComponent', () => {
  let component: CyberSecurityTrainingComponent;
  let fixture: ComponentFixture<CyberSecurityTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CyberSecurityTrainingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CyberSecurityTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
