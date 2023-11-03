import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/core/services/auth-service/auth-service.service';
import { BaseService } from 'src/app/service/base.service';
import { ConformationDialogComponent } from 'src/app/shared/components/conformation-dialog/conformation-dialog.component';
import { ToastrServiceService } from 'src/app/shared/services/toastr/toastr.service';
@Component({
  selector: 'app-hall-ticket',
  templateUrl: './hall-ticket.component.html',
  styleUrls: ['./hall-ticket.component.scss']
})
export class HallTicketComponent implements OnInit {
  loggedInUserRole: string;

  //#region (global variables)

  studentDetails: any

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
    private authService: AuthServiceService,
    private baseService: BaseService,
    private dialog: MatDialog,
    private toasterService: ToastrServiceService,
    private renderer: Renderer2,
  ) {
    this.loggedInUserRole = this.authService.getUserRoles()[0];
    this.stateData = this.router?.getCurrentNavigation()?.extras.state;
  }
  //#endregion

  ngOnInit(): void {
    this.intialisation()
  }

  //#region (intialisation)

  intialisation() {
    if (this.stateData) {
      //this state data is used for admin and student
      // make sure to check both flows before making changes
      this.studentDetails = {
        hallticketId: this.stateData?.data.id,
        examCyclename: this.stateData?.data.examCycle.name,
        examCycleId: this.stateData?.data.examCycleId,
        firstName: this.stateData?.data.firstName,
        lastName: this.stateData?.data.lastName,
        studentEnrollmentNumber: this.stateData?.data.studentEnrollmentNumber,
        dob: this.stateData?.data.dob,
        actualDOB: this.stateData?.data.actualDOB,
        courseName: this.stateData?.data.courseName,
        courseYear: this.stateData?.data.courseYear,
      };
      this.examTableData  =  this.stateData?.data.examCycle.exams;
    } else {
     // this.router.navigateByUrl('candidate-portal')
     this.toasterService.showToastr("Something went wrong. Please try again later.", 'Error', 'error')
    }
  }


  //#endregion

  //#region (navigate to modify)
  redirectToModifyHallticket() {
    this.router.navigate(['/candidate-portal/modify-hallticket'],{ 
      state: {
        studentDetails: this.studentDetails,
        exams: this.examTableData
      }
    })
  }

  cancel() {
    this.router.navigateByUrl('/hall-ticket-management')
  }
  //#endregion

  downloadHallTicket(event: boolean) {
    const studentID = this.authService.getUserRepresentation().attributes.studentId;
    this.baseService.downloadHallTicket$(this.studentDetails.examCycleId,studentID[0])
    .subscribe({
      next: (data: any) => {

        console.log(data)
        const link = this.renderer.createElement('a');
        link.setAttribute('target', '_blank');
        link.setAttribute('href', data.responseData);
        link.click();
        link.remove();

        const dialogRef = this.dialog.open(ConformationDialogComponent, {
          data: {
            dialogType: 'success',
            description: ['Hall ticket downloaded successfully'],
            buttons: [
              {
                btnText: 'Ok',
                positionClass: 'center',
                btnClass: 'btn-full',
                response: true
              },
            ],
          },
          width: '700px',
          height: '400px',
          maxWidth: '90vw',
          maxHeight: '90vh'
        })
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
          this.router.navigateByUrl('/candidate-portal')
          }
        })
      },
      error: (error: HttpErrorResponse) => {
        this.toasterService.showToastr(error, 'Error', 'error')
      }
    })
  }

}
