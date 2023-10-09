import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmStudentRegistrationComponent } from './confirm-student-registration.component';

describe('ConfirmStudentRegistrationComponent', () => {
  let component: ConfirmStudentRegistrationComponent;
  let fixture: ComponentFixture<ConfirmStudentRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmStudentRegistrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmStudentRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
