import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseService } from 'src/app/service/base.service';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, forkJoin, mergeMap, of } from 'rxjs';
import { ToastrServiceService } from 'src/app/shared/services/toastr/toastr.service';
import { AuthServiceService } from 'src/app/core/services/auth-service/auth-service.service';

@Component({
  selector: 'app-candidate-portal',
  templateUrl: './candidate-portal.component.html',
  styleUrls: ['./candidate-portal.component.scss']
})
export class CandidatePortalComponent implements OnInit {
  cardList: any[] = [];

  examCycleList = []

  examCycleFormControl = new FormControl();
  selectedExamCycle: any;
  hallTicketDetails: any;
  isDataLoading: boolean = false;
  studentID :string;
  studentDetails: any = {};
  studentResultsDetails: any = {}


  constructor(
    private router: Router,
    private baseService: BaseService,
    private authService: AuthServiceService,
    private toasterService: ToastrServiceService
  ) { }

  ngOnInit(): void {
    this.getExamCycles()
  }

  getExamCycles() {
    this.baseService.getExamCycleList$()
    // .pipe((mergeMap((res) => {
    //   return this.baseService.formatExamCyclesForDropdown(res.responseData)
    // })))
      .subscribe({
        next: (res: any) => {
          this.examCycleList = res.responseData;
          const lastIndexSelected: any = this.examCycleList[this.examCycleList.length - 1];
          this.examCycleFormControl.patchValue(lastIndexSelected.id);
          this.getResultAndHallticketDetails(lastIndexSelected.id)
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        }
      })
  }

  getResultAndHallticketDetails(examCycleId: any) {
    this.cardList = [];
    this.isDataLoading = true;
    this.studentID = this.authService.getUserRepresentation().attributes.studentId;
    console.log(this.studentID[0])

    this.baseService.getHallTicketData$(parseInt(this.studentID[0]), examCycleId)
      .subscribe({
        next: (res: any) => {
          if (res && res.responseData) {
            this.hallTicketDetails = res.responseData;
            this.hallTicketDetails.dob = this.baseService.reverseDate(res.responseData.dateOfBirth);
            this.hallTicketDetails.actualDOB = res.responseData.dateOfBirth;
            this.cardList.push({
              title: 'Hall Ticket',
              lable: 'Generated on',
              date: this.hallTicketDetails.hallTicketGenerationDate,
              status: this.hallTicketDetails.hallTicketStatus,
            })
            this.hallTicketDetails.examCycleId = examCycleId
          }
          this.isDataLoading = false;
        },
        error: (error: HttpErrorResponse) => {
          this.isDataLoading = false;
          this.toasterService.showToastr(error, 'Error', 'error');
        }
      });

    this.baseService.getStudentResults$(this.studentID,examCycleId)
    .subscribe({
      next: (res: any) => {
        if (res && res.responseData) {
          this.studentResultsDetails = res.responseData;
          this.studentResultsDetails.dob = this.baseService.reverseDate(res.responseData.dateOfBirth)
          const examCycle: any = this.examCycleList.find(((element: any) => element.id === examCycleId))
          this.studentResultsDetails['examCyclename'] = examCycle ? examCycle.examCycleName : '';
          this.studentResultsDetails['examCycleId'] = examCycleId;
          this.cardList.push({
            title: 'Results',
            lable: 'Published on',
            date: this.studentResultsDetails.publishedDate,
            status: 'PUBLISHED'
            // status: this.studentResultsDetails.publishStatus,
          })
        }
        this.isDataLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        this.isDataLoading = false;
        this.toasterService.showToastr(error, 'Error', 'error')
      }
    });
  }



  viewDetails(title: any) {
    if(title === 'Results') {
      this.router.navigate(['/candidate-portal/view-results'],{state: { data: this.studentResultsDetails}})
    } else if (title === 'Hall Ticket') {
      this.router.navigate(['/candidate-portal/view-hallticket'],{state: { data: this.hallTicketDetails}})
    }
  }

}
