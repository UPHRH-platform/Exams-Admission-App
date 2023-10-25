import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TableColumn, attendanceTableData } from 'src/app/interfaces/interfaces';
import { BaseService } from 'src/app/service/base.service';
import { ToastrServiceService } from 'src/app/shared/services/toastr/toastr.service';



interface Course {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-attendance-record-list',
  templateUrl: './attendance-record-list.component.html',
  styleUrls: ['./attendance-record-list.component.scss']
})
export class AttendanceRecordListComponent {
  constructor(private router: Router, 
    private baseService: BaseService,
    private toasterService: ToastrServiceService) { }

  examCycleList: any = [];

  examCycleFormControl = new FormControl();
  ngOnInit() {
    this.getExamCycles();
  }
  getExamCycles() {
    this.baseService.getExamCycleList$()
      .subscribe({
        next: (res: any) => {
          this.examCycleList = res.responseData;
          const lastIndexSelected: any = this.examCycleList[this.examCycleList.length - 1];
          this.examCycleFormControl.setValue(lastIndexSelected.id)
          this.getAttendenceByExamCycle(lastIndexSelected.id)
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        }
      })
  }
  getAttendenceByExamCycle(id: any) {
    this.baseService.getAttendenceByExamCycle$(id)
      .subscribe({
        next: (res: any) => {
          console.log(res)
          this.examTableData = res.responseData;

        },
        error: (error: HttpErrorResponse) => {
          this.toasterService.showToastr('No attendance records found  !!', 'Error', 'error', '');
        }
      })
  }

  getSelectedExamcycleId(e: any) {
    this.getAttendenceByExamCycle(e)
  }

  examTableHeader = [
    {
      header: 'Student name',
      columnDef: 'studentName',
      cell: (element: Record<string, any>) => `${element['studentName']}`,
      cellStyle: {
        'background-color': '#0000000a',
        'color': '#00000099'
      }
    }, {
      header: 'Roll number',
      columnDef: 'rollNumber',
      cell: (element: Record<string, any>) => `${element['rollNumber']}`,
      cellStyle: {
        'background-color': '#0000000a', 'width': '135px', 'color': '#00000099'
      }
    }, {
      header: 'Course name',
      columnDef: 'courseName',
      cell: (element: Record<string, any>) => `${element['courseName']}`,
      cellStyle: {
        'background-color': '#0000000a', 'width': '135px', 'color': '#00000099'
      }
    }, {
      header: 'Admission year',
      columnDef: 'admissionYear',
      cell: (element: Record<string, any>) => `${element['admissionYear']}`,
      cellStyle: {
        'background-color': '#0000000a', 'width': '135px', 'color': '#00000099'
      }
    },
    {
      header: 'Total Days',
      columnDef: 'totalDays',
      cell: (element: Record<string, any>) => `${element['totalDays']}`,
      cellStyle: {
        'background-color': '#0000000a', 'width': '135px', 'color': '#00000099'
      }
    },
    {
      header: 'Present',
      columnDef: 'present',
      cell: (element: Record<string, any>) => `${element['present']}`,
      cellStyle: {
        'background-color': '#0000000a', 'width': '135px', 'color': '#00000099'
      }
    },
    {
      header: 'Absent',
      columnDef: 'absent',
      cell: (element: Record<string, any>) => `${element['absent']}`,
      cellStyle: {
        'background-color': '#0000000a', 'width': '135px', 'color': '#00000099'
      }
    },
    {
      header: 'Attendance(%)',
      columnDef: 'attendance',
      cell: (element: Record<string, any>) => `${element['attendance']}`,
      cellStyle: {
        'background-color': '#0000000a', 'width': '135px', 'color': '#00000099'
      }
    },
  ]
  examTableData = [
    /*  {
       studentName: 'Arun kumar', 
       rollNumber: '12345678', 
       courseName: 'M.Sc(NURSING)',
       admissionYear: 'Exam 1',
       totalDays:'45',
       present:'35',
       absent: '10',
       attendance: '78%'
     } */
  ]
  isHallTicket = true
  breadcrumbItems = [
    { label: 'Attendance Record', url: '' },
  ]

  goToUpload() {
    this.router.navigate(['manage-attendance/upload'])
  }
}
