import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItServerAdminComponent } from './it-server-admin.component';

describe('ItServerAdminComponent', () => {
  let component: ItServerAdminComponent;
  let fixture: ComponentFixture<ItServerAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItServerAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItServerAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
