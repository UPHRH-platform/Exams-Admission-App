import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeeManagementAdminComponent } from './fee-management-admin/fee-management-admin.component';
import { FeeManagementInstituteComponent } from './fee-management-institute/fee-management-institute.component';
import { FeeManagementListInstituteComponent } from './fee-management-list-institute/fee-management-list-institute.component';

const routes: Routes = [
  {
    path: 'admin', component: FeeManagementAdminComponent
  },
  {
    path: 'institute', component: FeeManagementInstituteComponent
  },
  {
    path: 'manage-fee', component: FeeManagementListInstituteComponent
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
export class FeeManagementRoutingModule { }
