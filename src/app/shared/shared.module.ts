import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { HeaderComponent } from './components/header/header.component';
import { SharedTableComponent } from './components/shared-table/shared-table.component';
import {MaterialModule} from '../../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationPopupComponent } from './components/confirmation-popup/confirmation-popup.component';
import { CommonLayoutComponent } from './components/common-layout/common-layout.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';

import { HttpClientModule } from '@angular/common/http';
import { ConformationDialogComponent } from './components/conformation-dialog/conformation-dialog.component';
import { ConfigService } from './services/config/config.service';
import { SharedSkeletonLoadingComponent } from './components/shared-skeleton-loading/shared-skeleton-loading.component';
import { UploadDialogComponent } from './components/upload-dialog/upload-dialog.component';
import { SharedQuestionPaperComponent } from './components/shared-ques-paper/shared-ques.component';
import { SharedExamCycleSelectComponent } from './components/shared-exam-cycle-select/shared-exam-cycle-select.component';
import { SharedNoResultCardComponent } from './components/shared-no-result-card/shared-no-result-card.component';
import { SharedCourseSelectComponent } from './components/shared-course-select/shared-course-select/shared-course-select.component';
import { SharedInstituteSelectComponent } from './components/shared-institute-select/shared-institute-select.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { PdfViewerModalComponent } from './components/pdf-viewer-modal/pdf-viewer-modal.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
@NgModule({
  declarations: [
    HeaderComponent,
    SharedTableComponent,
    SharedSkeletonLoadingComponent,
    // SharedDialogOverlayComponent,
    ConfirmationPopupComponent,
    CommonLayoutComponent,
    BreadcrumbComponent,
    ConformationDialogComponent,
    UploadDialogComponent,
    SharedQuestionPaperComponent,
    SharedExamCycleSelectComponent,
    SharedNoResultCardComponent,
    SharedCourseSelectComponent,
    SharedInstituteSelectComponent,
    SpinnerComponent,
    PdfViewerModalComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    PdfViewerModule
  ],
  exports :
  [
     SharedSkeletonLoadingComponent,
    BreadcrumbComponent,
    ReactiveFormsModule,
    FormsModule,
    HeaderComponent,
    SharedTableComponent,
    HttpClientModule,
    SharedQuestionPaperComponent,
    SharedExamCycleSelectComponent,
    SharedNoResultCardComponent,
    SharedCourseSelectComponent,
    SharedInstituteSelectComponent,
    SpinnerComponent,
    PdfViewerModalComponent
  ],
  providers: [ConfigService,
  
  ]
})
export class SharedModule { }