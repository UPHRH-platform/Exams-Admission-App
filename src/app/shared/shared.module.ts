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
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
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
    SharedNoResultCardComponent
  ],
  providers: [ConfigService]
})
export class SharedModule { }