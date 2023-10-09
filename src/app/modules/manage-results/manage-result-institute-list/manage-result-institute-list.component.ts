import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-manage-result-institute-list',
  templateUrl: './manage-result-institute-list.component.html',
  styleUrls: ['./manage-result-institute-list.component.scss']
})
export class ManageResultInstituteListComponent {
  breadcrumbItems = [
    {label: 'Manage Results', url: ''}
  ]
  constructor(
    private router: Router,
  ){}
  examTableHeader = [
    {
      header: 'Full name',
      columnDef: 'fullName',
      cell: (element: Record<string, any>) => `${element['fullName']}`,
      cellStyle: {
        'background-color': '#0000000a',
        'color': '#00000099'
      }
    },{
      header: 'Enrollment number',
      columnDef: 'enrollmentNumber',
      cell: (element: Record<string, any>) => `${element['enrollmentNumber']}`,
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
      header: 'Exam name',
      columnDef: 'examName',
      cell: (element: Record<string, any>) => `${element['examName']}`,
      cellStyle: {
        'background-color': '#0000000a', 'width': '135px', 'color': '#00000099'
      }
    },
    {
      header: 'Internal marks',
      columnDef: 'internalMarks',
      cell: (element: Record<string, any>) => `${element['internalMarks']}`,
      cellStyle: {
        'background-color': '#0000000a', 'width': '135px', 'color': '#00000099'
      }
    },
  ]
  examTableData= [
    {
      fullName: 'Arun kumar', 
      enrollmentNumber: '12345678', 
      courseName: 'M.Sc(NURSING)',
      examName: 'Exam 1',
      internalMarks:'45'
    },{
      fullName: 'Roopashree', 
      enrollmentNumber: '34567812', 
      courseName: 'M.Sc(NURSING)',
      examName: 'Exam 1',
      internalMarks:'45'
    },{
      fullName: 'Mansur', 
      enrollmentNumber: '56781234', 
      courseName: 'B.Sc(NURSING)',
      examName: 'Exam 1',
      internalMarks:'45'
    },
  ]
  isHallTicket = true
  goToList() {
    this.router.navigate(['/manage-result/institute'])
  }
}
