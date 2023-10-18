import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterStudentsComponent } from './register-students/register-students.component';
import { RegdStudentsComponent } from './regd-students/regd-students.component';
import { AddNewRegnComponent } from './add-new-regn/add-new-regn.component';
const routes: Routes = [
  {
    path: 'institute', component: RegisterStudentsComponent, pathMatch: 'full'
  },
  { path: 'view-regd-students/:id', component: RegdStudentsComponent, pathMatch: 'full' },
  { path: 'add-new-students-regn', component: AddNewRegnComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRegistrationRoutingModule { }


