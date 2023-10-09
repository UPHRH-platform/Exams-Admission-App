import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageResultInstituteComponent } from './manage-result-institute.component';

describe('ManageResultInstituteComponent', () => {
  let component: ManageResultInstituteComponent;
  let fixture: ComponentFixture<ManageResultInstituteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageResultInstituteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageResultInstituteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
