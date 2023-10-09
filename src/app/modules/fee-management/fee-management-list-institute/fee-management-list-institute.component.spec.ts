import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeManagementListInstituteComponent } from './fee-management-list-institute.component';

describe('FeeManagementListInstituteComponent', () => {
  let component: FeeManagementListInstituteComponent;
  let fixture: ComponentFixture<FeeManagementListInstituteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeeManagementListInstituteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeeManagementListInstituteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
