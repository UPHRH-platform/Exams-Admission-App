import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentRegistrationRoutingModule } from './student-registration.routing.module';
import { MaterialModule } from 'src/material/material.module';

import { RegisterStudentsComponent } from './register-students/register-students.component';
import { RegdStudentsComponent } from './regd-students/regd-students.component';
//#endregion
import { SharedModule } from '../../shared/shared.module';
import { AddNewRegnComponent } from './add-new-regn/add-new-regn.component';
import { ConfirmStudentRegistrationComponent } from './dialogs/confirm-student-registration/confirm-student-registration.component';


@NgModule({
  declarations: [
    RegisterStudentsComponent,
    RegdStudentsComponent,
    AddNewRegnComponent,
    ConfirmStudentRegistrationComponent,
  ],
  imports: [
    CommonModule,
    StudentRegistrationRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class StudentRegistrationModule { }
