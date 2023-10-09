import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/material/material.module';
import { SharedModule } from 'src/app/shared';

import { ManageAttendanceRoutingModule } from './manage-attendance-recore-routing.module';
import {AttendanceRecordListComponent} from './attendance-record-list/attendance-record-list.component';
import { AttendanceRecordUploadListComponent } from './attendance-record-upload-list/attendance-record-upload-list.component';
@NgModule({
  declarations: [
    AttendanceRecordListComponent,
    AttendanceRecordUploadListComponent
  ],
  imports: [
    CommonModule,
    ManageAttendanceRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule  ]
})
export class ManageAttendanceRecordModule { }
