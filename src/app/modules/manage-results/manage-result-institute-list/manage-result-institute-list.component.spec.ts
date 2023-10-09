import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageResultInstituteListComponent } from './manage-result-institute-list.component';

describe('ManageResultInstituteListComponent', () => {
  let component: ManageResultInstituteListComponent;
  let fixture: ComponentFixture<ManageResultInstituteListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageResultInstituteListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageResultInstituteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
