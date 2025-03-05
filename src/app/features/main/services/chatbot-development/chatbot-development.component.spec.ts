import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatbotDevelopmentComponent } from './chatbot-development.component';

describe('ChatbotDevelopmentComponent', () => {
  let component: ChatbotDevelopmentComponent;
  let fixture: ComponentFixture<ChatbotDevelopmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatbotDevelopmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatbotDevelopmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
