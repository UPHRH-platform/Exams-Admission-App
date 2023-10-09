import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttendanceRecordListComponent } from './attendance-record-list/attendance-record-list.component';
import { AttendanceRecordUploadListComponent } from './attendance-record-upload-list/attendance-record-upload-list.component';

const routes: Routes = [
  {
    path: '', component: AttendanceRecordListComponent
  },
  {
    path: 'upload', component: AttendanceRecordUploadListComponent
  },
  // {
  //   path: 'details', component: ManageExamCycleViewComponent
  // }
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
export class ManageAttendanceRoutingModule { }
