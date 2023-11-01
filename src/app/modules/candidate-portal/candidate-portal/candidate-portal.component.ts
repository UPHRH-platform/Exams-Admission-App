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
    this.getResultAndHallticketDetails(3) // remove when apis working
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

  getResultAndHallticketDetails(event: any) {
    this.cardList = [];
    this.isDataLoading = true;
    this.studentID = this.authService.getUserRepresentation().attributes.studentId;
    console.log(this.studentID[0])
    forkJoin([this.baseService.getHallTicketData$(parseInt(this.studentID[0]), event), 
    this.baseService.getStudentResults$(this.studentID, '25 mar 2021' ,event)])
 /*    forkJoin([this.baseService.getHallTicketData$(2, 5), 
    this.baseService.getStudentResults$(this.studentID, '25 mar 2021' ,event)]) */
    .pipe(
      catchError(error => {
        this.toasterService.showToastr(error, 'Error', 'error')
        return of([])
      })
    )
    .subscribe((res) => {
      if(res[0] && res[0].responseData) {
        this.hallTicketDetails = res[0].responseData;
        this.hallTicketDetails.dob = this.baseService.reverseDate(res[0].responseData.dateOfBirth);
        this.hallTicketDetails.actualDOB = res[0].responseData.dateOfBirth;
        this.cardList.push({
          title: 'Hall Ticket',
          lable: 'Generated on',
          date: this.hallTicketDetails.hallTicketGenerationDate,
          status: this.hallTicketDetails.hallTicketStatus,
        })
        this.hallTicketDetails.examCycleId = this.examCycleFormControl.value
      }
      if(res[1] && res[1].responseData) {
        this.studentResultsDetails = res[1].responseData;
        this.studentResultsDetails.dob = this.baseService.reverseDate(res[1].responseData.dateOfBirth)
        const examCycle: any = this.examCycleList.find(((element: any) => element.id === event))
        this.studentResultsDetails['examCyclename'] = examCycle ? examCycle.examCycleName : '';
        this.cardList.push({
          title: 'Results',
          lable: 'Published on',
          date: this.studentResultsDetails.publishedDate,
          status: this.studentResultsDetails.publishStatus,
        })
      }
      this.isDataLoading = false;
    })
  }



  viewDetails(title: any) {
    if(title === 'Results') {
      this.router.navigate(['/candidate-portal/view-results'],{state: { data: this.studentResultsDetails}})
    } else if (title === 'Hall Ticket') {
      this.router.navigate(['/candidate-portal/view-hallticket'],{state: { data: this.hallTicketDetails}})
    }
  }

}
