import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiProductDevelopmentComponent } from './ai-product-development.component';

describe('AiProductDevelopmentComponent', () => {
  let component: AiProductDevelopmentComponent;
  let fixture: ComponentFixture<AiProductDevelopmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AiProductDevelopmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiProductDevelopmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
