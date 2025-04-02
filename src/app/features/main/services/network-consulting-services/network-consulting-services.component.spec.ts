import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkConsultingServicesComponent } from './network-consulting-services.component';

describe('NetworkConsultingServicesComponent', () => {
  let component: NetworkConsultingServicesComponent;
  let fixture: ComponentFixture<NetworkConsultingServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NetworkConsultingServicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NetworkConsultingServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
