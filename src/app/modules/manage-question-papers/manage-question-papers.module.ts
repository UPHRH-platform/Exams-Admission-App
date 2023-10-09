//#region (imports)

//#region ()
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//#endregion

//#region (created modules && components)
import { ManageQuestionPapersRoutingModule } from './manage-question-papers-routing.module';
import { MaterialModule } from 'src/material/material.module';
import { ManageQuestionPapersComponent } from './manage-question-papers/manage-question-papers.component';
import { DownloadQuesPapersComponent } from './download-ques-papers/download-ques-papers.component';
//#endregion
import { SharedModule } from '../../shared/shared.module';
//#endregion



@NgModule({
  declarations: [
    ManageQuestionPapersComponent,
    DownloadQuesPapersComponent
  ],
  imports: [
    CommonModule,
    ManageQuestionPapersRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class ManageQuestionPapersModule { }
