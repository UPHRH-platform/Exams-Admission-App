import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  isDataLoading: boolean = false;
  isHallTicket = true
  //#endregion

  //#region (constructor)
  constructor(
    private router: Router,
    private baseService: BaseService,
    private route: ActivatedRoute,
    private authService: AuthServiceService
  ) {
    this.loggedInUserRole = this.authService.getUserRoles()[0];
  }
  //#endregion

  ngOnInit(): void {
    let eid  = this.route.snapshot.paramMap.get('eid') ||""
    let sid  = this.route.snapshot.paramMap.get('sid') ||""
    console.log(eid)
    console.log(sid)
    this.intialisation(parseInt(sid),parseInt(eid))
  }

  //#region (intialisation)

  intialisation(studentId: number, examCycleId: number) {
    this.isDataLoading = true;
  /*   this.baseService.getHallTicketData$(studentId,examCycleId).subscribe({ */
      this.baseService.getHallTicketData$(12,5).subscribe({

      next: (res: any) => {
        if (res && res.responseData) {
        this.hallTicketDetails = res.responseData;
        this.hallTicketDetails = res.responseData;
        this.hallTicketDetails.dob = this.reverseDate(res.responseData.dateOfBirth)
        this.examTableData  =  res.responseData.exams;
        }
        this.isDataLoading = false;
      },
      error: (error: any) => {
        console.log(error.message)
        this.isDataLoading = false;
      }
    })
 
  }

  reverseDate(date: string){
    let Dob = new Date(date);
    return  Dob.getDate() + "-" + `${Dob.getMonth() + 1}` + "-" + Dob.getFullYear()
  }

/*   getHallTicketDetails() {
    this.baseService.getHallTicketDetails()
   .subscribe((examDetails: any)) {

    }
  } */

  // formateExamDetails(examData: any) {
  //   let formatedData = examData
  //   return formatedData;
  // }

  //#endregion

  //#region (navigate to modify)
  redirectToModifyHallticket() {
    this.router.navigate(['/candidate-portal/modify-hallticket'],{ state: this.hallTicketDetails })
  }

  cancel() {
    this.router.navigateByUrl('/hall-ticket-management')
  }
  //#endregion

}
