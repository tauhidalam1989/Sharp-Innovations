import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiMlServicesComponent } from './ai-ml-services.component';

describe('AiMlServicesComponent', () => {
  let component: AiMlServicesComponent;
  let fixture: ComponentFixture<AiMlServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AiMlServicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiMlServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
