//#region (imports)

//#region ()
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/material/material.module';
import { SharedModule } from 'src/app/shared';
//#endregion

//#region (created modules && components)
import { CctvVerificationRoutingModule } from './cctv-verification-routing.module';
import { CctvManagementAdminComponent } from './cctv-management-admin/cctv-management-admin.component';
import { CctvApprovalPopupComponent } from '../../shared/components/cctv-approval-popup/cctv-approval-popup.component';

@NgModule({
  declarations: [
    CctvManagementAdminComponent,
    CctvApprovalPopupComponent
  ],
  imports: [
    CommonModule,
    CctvVerificationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule
  ]
})
export class CctvVerificationModule { }
