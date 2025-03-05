import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloudDevelopmentComponent } from './cloud-development.component';

describe('CloudDevelopmentComponent', () => {
  let component: CloudDevelopmentComponent;
  let fixture: ComponentFixture<CloudDevelopmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CloudDevelopmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CloudDevelopmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
