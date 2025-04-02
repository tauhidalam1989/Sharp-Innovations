import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NlpServicesComponent } from './nlp-services.component';

describe('NlpServicesComponent', () => {
  let component: NlpServicesComponent;
  let fixture: ComponentFixture<NlpServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NlpServicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NlpServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
