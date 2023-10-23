import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseService } from 'src/app/service/base.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-candidate-portal',
  templateUrl: './candidate-portal.component.html',
  styleUrls: ['./candidate-portal.component.scss']
})
export class CandidatePortalComponent implements OnInit {
  cardList: any[] = [
    {
      title: 'Results',
      lable: 'Published on',
      date: '25 Mar 2023',
      status: 'Published',
      navigateUrl: '/candidate-portal/view-results',
    }
  ];

  examCycleList = []

  candidateFormGroup: FormGroup;
  selectedExamCycle: any;
  hallTicketDetails: any;
  isDataLoading: boolean = false;


  constructor(
    private router: Router,
    private baseService: BaseService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {

    this.initiateCandidateForm();
  }
  initiateCandidateForm() {

    this.candidateFormGroup = this.formBuilder.group({
      examCycleFormControl: new FormControl('', [
        Validators.required]),
    })
    this.getExamCycles()
  }

  onCandidateFormGroupSubmit(value: any) {
    if (this.candidateFormGroup.valid) {
      this.router.navigate(['/candidate-portal/view-hallticket'], { state: { data: this.hallTicketDetails } });
    }
  }

  getHallTicketDetails(studentId: number, examCycleId: number) {
    this.isDataLoading = true;
    this.baseService.getHallTicketData$(studentId, examCycleId).subscribe({
      next: (res: any) => {
        if (res && res.responseData) {
          this.hallTicketDetails = res.responseData;
          this.hallTicketDetails.dob = this.reverseDate(res.responseData.dateOfBirth)
        }
        console.log( this.hallTicketDetails)
        this.cardList.push({
          title: 'Hall Ticket',
          lable: 'Generated on',
          date: this.reverseDate(this.hallTicketDetails.hallTicketGenerationDate),
          status: this.hallTicketDetails.hallTicketStatus,
        })
        this.isDataLoading = false;
      },
      error: (error: any) => {
        console.log(error.message)
        this.isDataLoading = false;
      }
    })
  }

  reverseDate(date: string) {
    let Dob = new Date(date);
    return Dob.getDate() + "-" + `${Dob.getMonth() + 1}` + "-" + Dob.getFullYear()
  }


  getExamCycles() {
    this.baseService.getExamCycleList$()
      .subscribe({
        next: (res: any) => {
          this.examCycleList = res.responseData;
          const lastIndexSelected: any = this.examCycleList[this.examCycleList.length - 1];
          this.candidateFormGroup.patchValue({
            examCycleFormControl: lastIndexSelected.id
          });
          if(!this.hallTicketDetails){
            this.getHallTicketDetails(12, 5)
          }
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        }
      })
  }

}
