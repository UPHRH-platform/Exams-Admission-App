import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageQuestionPapersComponent } from './manage-question-papers/manage-question-papers.component';
import { DownloadQuesPapersComponent } from './download-ques-papers/download-ques-papers.component';

const routes: Routes = [
  {path: '', component: ManageQuestionPapersComponent },
  {
    path: 'institute', component: DownloadQuesPapersComponent, pathMatch: 'full',
  },
];
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class ManageQuestionPapersRoutingModule { }
