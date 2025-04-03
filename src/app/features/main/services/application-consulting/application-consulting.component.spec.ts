import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationConsultingComponent } from './application-consulting.component';

describe('ApplicationConsultingComponent', () => {
  let component: ApplicationConsultingComponent;
  let fixture: ComponentFixture<ApplicationConsultingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationConsultingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationConsultingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
