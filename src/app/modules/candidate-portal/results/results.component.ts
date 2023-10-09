import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { mergeMap, of } from 'rxjs';
import { BaseService } from 'src/app/service/base.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  //#region (global variables)
  hallTicketDetails = {
    exmaCycleName: 'Exam Cycle 1',
    studentDetails: {
      firstName: 'Rajash',
      lastName: 'Kumaravel',
      roolNumber: '12345 89078',
      DOB: '24-01-1998',
    }, 
    hallTicketDetqails: {
      courseName: 'M. Sc. Nursing',
      courseYear: '2022 - 2023'
    }
  }

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
      columnDef: 'status',
      cell: (element: Record<string, any>) => `${element['status']}`,
      cellStyle: {
        'background-color': '#0000000a', 'width': '135px', 'color': '#00000099'
      }
    },
  ]

  examTableData= []

  isHallTicket = true
  //#endregion

  //#region (constructor)
  constructor(
    private router: Router,
    private baseService: BaseService
  ) {}
  //#endregion

  ngOnInit(): void {
    this.intialisation()
  }

  //#region (intialisation)
  intialisation() {
    this.getExamResults()
  }

  getExamResults() {
    this.baseService.getResults()
    .pipe(mergeMap((res: any) => {
      return this.formateResultDetails(res)
    })).subscribe((results: any) => {
      this.examTableData = results.examResults
    })
  }

  formateResultDetails(results: any) {
    const exams: {
      examResults: {
        examName: string,
        internalMarks: string,
        externalMarks: string,
        totalMarks: string,
        status: string,
        hasStyle: boolean,
        cellStyle: {
          status: {
            color: string
          }
        },
      }[]
    } = {
      examResults: []
    }

    if (results) {
      results.forEach((result: any) => {
        const examResult = {
          examName: result.examName,
          internalMarks: result.internalMarks,
          externalMarks: result.externalMarks,
          totalMarks: result.totalMarks,
          status: result.status,
          hasStyle: true,
          cellStyle: {
            status: {
              color: result.status === 'Fail' ? 'red' : 'green'
            }
          },
        }
        exams.examResults.push(examResult)
      })
    }
    return of(exams);
  }

  //#endregion

  //#region (navigate to modify)
  redirectToRequestRevalution() {
    this.router.navigateByUrl('/candidate-portal/request-revalution')
  }
  //#endregion

}
