import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CybersecurityImplementationComponent } from './cybersecurity-implementation.component';

describe('CybersecurityImplementationComponent', () => {
  let component: CybersecurityImplementationComponent;
  let fixture: ComponentFixture<CybersecurityImplementationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CybersecurityImplementationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CybersecurityImplementationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
