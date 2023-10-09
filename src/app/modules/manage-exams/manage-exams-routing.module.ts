import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageExamCycleListComponent } from './manage-exam-cycle-list/manage-exam-cycle-list.component';
import { ManageExamCycleFormComponent } from './manage-exam-cycle-form/manage-exam-cycle-form.component';
import { ManageExamCycleViewComponent } from './manage-exam-cycle-view/manage-exam-cycle-view.component';

const routes: Routes = [
  {
    path: '', component: ManageExamCycleListComponent
  },
  {
    path: 'form', component: ManageExamCycleFormComponent
  },
  {
    path: 'form/:id', component: ManageExamCycleFormComponent
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
export class ManageExamsRoutingModule { }
