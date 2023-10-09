//#region (imports)

//#region ()
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//#endregion

//#region (created modules && components)
import { ManageResultsRoutingModule } from './manage-results-routing.module';
import { MaterialModule } from 'src/material/material.module';
import { ManageResultAdminComponent } from './manage-result-admin/manage-result-admin.component';
import { SharedModule } from 'src/app/shared';
import { ManageResultInstituteComponent } from './manage-result-institute/manage-result-institute.component';
import { UploadResultsInstituteComponent } from './upload-results-institute/upload-results-institute.component';
import { ManageResultInstituteListComponent } from './manage-result-institute-list/manage-result-institute-list.component';
//#endregion

//#endregion



@NgModule({
  declarations: [
    ManageResultAdminComponent,
    ManageResultInstituteComponent,
    UploadResultsInstituteComponent,
    ManageResultInstituteListComponent
  ],
  imports: [
    CommonModule,
    ManageResultsRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class ManageResultsModule { }
