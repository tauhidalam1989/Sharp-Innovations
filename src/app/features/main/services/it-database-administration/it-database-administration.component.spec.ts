import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItDatabaseAdministrationComponent } from './it-database-administration.component';

describe('ItDatabaseAdministrationComponent', () => {
  let component: ItDatabaseAdministrationComponent;
  let fixture: ComponentFixture<ItDatabaseAdministrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItDatabaseAdministrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItDatabaseAdministrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
