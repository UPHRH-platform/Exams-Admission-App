import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFormComponent } from './user-form/user-form.component';
import { UserModuleRoutingModule } from './user-module-routing.module';
import { MaterialModule } from 'src/material/material.module';
import { SharedModule } from '../../shared/shared.module';
import { ManageUserListComponent } from './manage-user-list/manage-user-list.component';



@NgModule({
  declarations: [
    UserFormComponent,
    ManageUserListComponent
  ],
  imports: [
    CommonModule,
    UserModuleRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class UserModuleModule { }
