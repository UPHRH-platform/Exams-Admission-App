import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/core/services/auth-service/auth-service.service';
import { BaseService } from '../../../service/base.service';
@Component({
  selector: 'app-hall-ticket',
  templateUrl: './hall-ticket.component.html',
  styleUrls: ['./hall-ticket.component.scss']
})
export class HallTicketComponent implements OnInit {
  loggedInUserRole: string;

  //#region (global variables)

  hallTicketDetails: any

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
      header: 'Exam date',
      columnDef: 'examDate',
      cell: (element: Record<string, any>) => `${element['examDate']}`,
      cellStyle: {
        'background-color': '#0000000a', 'width': '135px', 'color': '#00000099'
      }
    },{
      header: 'Exam start time',
      columnDef: 'startTime',
      cell: (element: Record<string, any>) => `${element['startTime']}`,
      cellStyle: {
        'background-color': '#0000000a', 'width': '135px', 'color': '#00000099'
      }
    },{
      header: 'Exam end time',
      columnDef: 'endTime',
      cell: (element: Record<string, any>) => `${element['endTime']}`,
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
    private baseService: BaseService,
    private authService: AuthServiceService
  ) {
    this.loggedInUserRole = this.authService.getUserRoles()[0];
  }
  //#endregion

  ngOnInit(): void {
    this.intialisation()
  }

  //#region (intialisation)
  intialisation() {

    this.baseService.getHallTicketData$(11).subscribe({
      next: (res: any) => {

        if (res && res[0]) {
      
        this.hallTicketDetails = res[0];

        this.examTableData  = res[0]!.examCycle.exams;
        }

        
      },
      error: (error: any) => {
        console.log(error.message)
      }
    })
 
  }

  getHallTicketDetails() {
    //this.candidatePortalService.getHallTicketDetails()
    // .pipe(mergeMap((res: any) => {
    //   return this.formateExamDetails(res)
    // })).subscribe((examDetails: any)) {

    // }
  }

  // formateExamDetails(examData: any) {
  //   let formatedData = examData
  //   return formatedData;
  // }

  //#endregion

  //#region (navigate to modify)
  redirectToModifyHallticket() {
    this.router.navigateByUrl('/candidate-portal/modify-hallticket')
  }

  cancel() {
    this.router.navigateByUrl('/hall-ticket-management')
  }
  //#endregion

}
