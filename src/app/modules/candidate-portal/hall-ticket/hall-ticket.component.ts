import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/core/services/auth-service/auth-service.service';
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
  stateData: any | undefined;
  //#endregion

  //#region (constructor)
  constructor(
    private router: Router,
    private authService: AuthServiceService
  ) {
    this.loggedInUserRole = this.authService.getUserRoles()[0];
    this.stateData = this.router?.getCurrentNavigation()?.extras.state;
    console.log(this.stateData.data)
  }
  //#endregion

  ngOnInit(): void {
    this.intialisation()
  }

  //#region (intialisation)

  intialisation() {
    this.hallTicketDetails = this.stateData.data;
    this.examTableData  =  this.stateData.data.exams;
  }


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
