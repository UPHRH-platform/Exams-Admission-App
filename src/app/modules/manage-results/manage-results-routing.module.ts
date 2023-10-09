import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageResultAdminComponent } from './manage-result-admin/manage-result-admin.component';
import { ManageResultInstituteComponent } from './manage-result-institute/manage-result-institute.component';
import { UploadResultsInstituteComponent } from './upload-results-institute/upload-results-institute.component';
import { AdminGuard } from 'src/app/core/guards/role-guard/role.guard';
import { ManageResultInstituteListComponent } from './manage-result-institute-list/manage-result-institute-list.component';


const routes: Routes = [
  {
    path: 'admin', component: ManageResultAdminComponent , canActivate:[AdminGuard]
  },
  {
    path: 'institute', component: ManageResultInstituteComponent
  },
  {
    path: 'institute/upload', component: UploadResultsInstituteComponent,pathMatch: 'full',
  },
  {
    path: 'institute/list', component: ManageResultInstituteListComponent ,pathMatch: 'full',
  }
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
export class ManageResultsRoutingModule { }
