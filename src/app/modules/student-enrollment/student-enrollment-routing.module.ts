import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentEnrollmentComponent } from './student-enrollment/student-enrollment.component';
import { AdminGuard, InstituteGuard } from 'src/app/core/guards/role-guard/role.guard';
import { StudentEnrollmentFormComponent } from './student-enrollment-form/student-enrollment-form.component';

const routes: Routes = [
  {path: 'institute', component: StudentEnrollmentComponent, canActivate: [InstituteGuard]},
  {path: 'add-enrollment', component: StudentEnrollmentFormComponent, pathMatch: 'full', canActivate: [InstituteGuard]},
  { path: 'admin', component: StudentEnrollmentComponent, canActivate: [AdminGuard]},
  {path: 'view-enrollment/:id', component: StudentEnrollmentFormComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class StudentEnrollmentRoutingModule { }
