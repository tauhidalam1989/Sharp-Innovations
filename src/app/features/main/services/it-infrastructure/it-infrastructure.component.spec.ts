import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItInfrastructureComponent } from './it-infrastructure.component';

describe('ItInfrastructureComponent', () => {
  let component: ItInfrastructureComponent;
  let fixture: ComponentFixture<ItInfrastructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItInfrastructureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItInfrastructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
