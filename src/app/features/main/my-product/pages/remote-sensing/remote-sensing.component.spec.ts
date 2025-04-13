import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoteSensingComponent } from './remote-sensing.component';

describe('RemoteSensingComponent', () => {
  let component: RemoteSensingComponent;
  let fixture: ComponentFixture<RemoteSensingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoteSensingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoteSensingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
