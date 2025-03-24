import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CyberSecurityAwarenessComponent } from './cyber-security-awareness.component';

describe('CyberSecurityAwarenessComponent', () => {
  let component: CyberSecurityAwarenessComponent;
  let fixture: ComponentFixture<CyberSecurityAwarenessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CyberSecurityAwarenessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CyberSecurityAwarenessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
