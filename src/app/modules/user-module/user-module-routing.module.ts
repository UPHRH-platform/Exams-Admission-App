import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserFormComponent } from './user-form/user-form.component';
import {ManageUserListComponent} from './manage-user-list/manage-user-list.component';

const routes: Routes = [
  {path: '', component: ManageUserListComponent },
  {
    path: 'user-form', component: UserFormComponent, pathMatch: 'full',
  },
];
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class UserModuleRoutingModule { }