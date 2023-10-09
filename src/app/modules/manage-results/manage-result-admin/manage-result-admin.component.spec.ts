import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageResultAdminComponent } from './manage-result-admin.component';

describe('ManageResultAdminComponent', () => {
  let component: ManageResultAdminComponent;
  let fixture: ComponentFixture<ManageResultAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageResultAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageResultAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
