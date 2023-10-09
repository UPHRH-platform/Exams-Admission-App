import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TableColumn, attendanceTableData } from 'src/app/interfaces/interfaces';



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
  constructor(private router: Router){}

  courses: Course[] = [
    {value: 'bsc', viewValue: 'BSc'},
    {value: 'msc', viewValue: 'MSc'},
  ];

  examTableHeader = [
    {
      header: 'Student name',
      columnDef: 'studentName',
      cell: (element: Record<string, any>) => `${element['studentName']}`,
      cellStyle: {
        'background-color': '#0000000a',
        'color': '#00000099'
      }
    },{
      header: 'Roll number',
      columnDef: 'rollNumber',
      cell: (element: Record<string, any>) => `${element['rollNumber']}`,
      cellStyle: {
        'background-color': '#0000000a', 'width': '135px', 'color': '#00000099'
      }
    },{
      header: 'Course name',
      columnDef: 'courseName',
      cell: (element: Record<string, any>) => `${element['courseName']}`,
      cellStyle: {
        'background-color': '#0000000a', 'width': '135px', 'color': '#00000099'
      }
    },{
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
  examTableData= [
    {
      studentName: 'Arun kumar', 
      rollNumber: '12345678', 
      courseName: 'M.Sc(NURSING)',
      admissionYear: 'Exam 1',
      totalDays:'45',
      present:'35',
      absent: '10',
      attendance: '78%'
    },{
      studentName: 'Arun kumar', 
      rollNumber: '12345678', 
      courseName: 'M.Sc(NURSING)',
      admissionYear: 'Exam 1',
      totalDays:'45',
      present:'35',
      absent: '10',
      attendance: '78%'
    },{
      studentName: 'Arun kumar', 
      rollNumber: '12345678', 
      courseName: 'M.Sc(NURSING)',
      admissionYear: 'Exam 1',
      totalDays:'45',
      present:'35',
      absent: '10',
      attendance: '78%'
    },
  ]
  isHallTicket = true
  breadcrumbItems = [
    { label: 'Attendance Record', url: '' },
  ]

  goToUpload() {
    this.router.navigate(['manage-attendance/upload'])
  }
}
