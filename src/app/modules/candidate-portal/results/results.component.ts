import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  //#region (global variables)
  studentDetails ={}

  examTableHeader = [
    {
      header: 'Name of exam',
      columnDef: 'examName',
      cell: (element: Record<string, any>) => `${element['examName']}`,
      cellStyle: {
        'background-color': '#0000000a',
        'color': '#00000099'
      }
    },{
      header: 'Internal mark',
      columnDef: 'internalMarks',
      cell: (element: Record<string, any>) => `${element['internalMarks']}`,
      cellStyle: {
        'background-color': '#0000000a', 'width': '135px', 'color': '#00000099'
      }
    },{
      header: 'External mark',
      columnDef: 'externalMarks',
      cell: (element: Record<string, any>) => `${element['externalMarks']}`,
      cellStyle: {
        'background-color': '#0000000a', 'width': '135px', 'color': '#00000099'
      }
    },{
      header: 'Total marks',
      columnDef: 'totalMarks',
      cell: (element: Record<string, any>) => `${element['totalMarks']}`,
      cellStyle: {
        'background-color': '#0000000a', 'width': '135px', 'color': '#00000099'
      }
    },{
      header: 'Status',
      columnDef: 'result',
      cell: (element: Record<string, any>) => `${element['result']}`,
      cellStyle: {
        'background-color': '#0000000a', 'width': '135px', 'color': '#00000099'
      }
    },
  ]

  examTableData= []

  isHallTicket = true
  resultsDetails: any
  //#endregion

  //#region (constructor)
  constructor(
    private router: Router
  ) {
    this.resultsDetails = this.router?.getCurrentNavigation()?.extras.state;
  }
  //#endregion

  ngOnInit(): void {
    this.intialisation()
  }

  //#region (intialisation)
  intialisation() {
    if (this.resultsDetails) {
      console.log('data', this.resultsDetails)
      this.studentDetails = {
        examCyclename: this.resultsDetails?.data.examCyclename,
        firstName: this.resultsDetails?.data.firstName,
        lastName: this.resultsDetails?.data.lastName,
        studentEnrollmentNumber: this.resultsDetails?.data.enrollmentNumber,
        dob: this.resultsDetails?.data.dob,
        courseName: this.resultsDetails?.data.courseName,
        courseYear: this.resultsDetails?.data.courseYear,
      };
      this.examTableData  =  this.resultsDetails?.data.examDetails;
    } else {
      this.router.navigateByUrl('candidate-portal')
    }
  }

  //#endregion

  //#region (navigate to modify)
  redirectToRequestRevalution() {
    this.router.navigate(['/candidate-portal/request-revalution'],{ 
      state: {
        studentDetails: this.studentDetails,
        exams: this.examTableData
      }
    })
  }
  //#endregion

}
