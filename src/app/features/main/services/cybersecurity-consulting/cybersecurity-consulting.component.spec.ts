import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CybersecurityConsultingComponent } from './cybersecurity-consulting.component';

describe('CybersecurityConsultingComponent', () => {
  let component: CybersecurityConsultingComponent;
  let fixture: ComponentFixture<CybersecurityConsultingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CybersecurityConsultingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CybersecurityConsultingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
