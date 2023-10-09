import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentEnrollmentFormComponent } from './student-enrollment-form.component';

describe('StudentEnrollmentFormComponent', () => {
  let component: StudentEnrollmentFormComponent;
  let fixture: ComponentFixture<StudentEnrollmentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentEnrollmentFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentEnrollmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
