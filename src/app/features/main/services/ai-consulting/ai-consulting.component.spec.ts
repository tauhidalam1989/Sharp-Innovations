import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiConsultingComponent } from './ai-consulting.component';

describe('AiConsultingComponent', () => {
  let component: AiConsultingComponent;
  let fixture: ComponentFixture<AiConsultingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AiConsultingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiConsultingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
