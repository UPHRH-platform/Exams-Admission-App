//#region (imports)

//#region ()
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//#endregion

//#region (created modules && components)
import { StudentEnrollmentRoutingModule } from './student-enrollment-routing.module';
import { StudentEnrollmentComponent } from './student-enrollment/student-enrollment.component';
import { MaterialModule } from 'src/material/material.module';
import { StudentEnrollmentFormComponent } from './student-enrollment-form/student-enrollment-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared';
//#endregion

//#endregion



@NgModule({
  declarations: [
    StudentEnrollmentComponent,
    StudentEnrollmentFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StudentEnrollmentRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class StudentEnrollmentModule { }
