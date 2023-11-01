//#region (imports)

//#region ()
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
//#endregion

//#region (created modules && components)
import { ManageExamsRoutingModule } from './manage-exams-routing.module';
import { ManageExamCycleFormComponent } from './manage-exam-cycle-form/manage-exam-cycle-form.component';
import { ManageExamCycleListComponent } from './manage-exam-cycle-list/manage-exam-cycle-list.component';
import { ManageExamCycleViewComponent } from './manage-exam-cycle-view/manage-exam-cycle-view.component';
import { MaterialModule } from 'src/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
//#endregion

//#endregion



@NgModule({
  declarations: [
    ManageExamCycleFormComponent,
    ManageExamCycleListComponent,
    ManageExamCycleViewComponent,
    UploadFileComponent
  ],
  imports: [
    CommonModule,
    ManageExamsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [
    DatePipe,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ],
})
export class ManageExamsModule { }
