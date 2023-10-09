//#region (imports)

//#region ()
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//#endregion

//#region (created modules && components)
import { FeeManagementRoutingModule } from './fee-management-routing.module';
import { FeeManagementAdminComponent } from './fee-management-admin/fee-management-admin.component';
import { FeeManagementInstituteComponent } from './fee-management-institute/fee-management-institute.component';
import { MaterialModule } from 'src/material/material.module';
import { FeeManagementListInstituteComponent } from './fee-management-list-institute/fee-management-list-institute.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared';
import { LoadingDialogComponent } from './loading-dialog/loading-dialog.component';
//#endregion

//#endregion



@NgModule({
  declarations: [
    FeeManagementAdminComponent,
    FeeManagementInstituteComponent,
    FeeManagementListInstituteComponent,
    LoadingDialogComponent,
  ],
  imports: [
    CommonModule,
    FeeManagementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule
  ]
})
export class FeeManagementModule { }
