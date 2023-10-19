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
      title: 'Hall Ticket',
      lable: 'Generated on',
      date: '25 Mar 2023',
      status: 'Generated',
      navigateUrl: '/candidate-portal/view-hallticket',
    }, {
      title: 'Results',
      lable: 'Published on',
      date: '25 Mar 2023',
      status: 'Published',
      navigateUrl: '/candidate-portal/view-results',
    },
  ];

  examCycleList = []

  candidateFormGroup: FormGroup;


  constructor(
    private router: Router,
    private baseService: BaseService,
     private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
   
    this.initiateCandidateForm()
  }
  initiateCandidateForm() {
 
    this.candidateFormGroup = this.formBuilder.group({
      examCycleFormControl: new FormControl('', [
        Validators.required]),
   
    })
    this.getExamCycles()
  }

  onCandidateFormGroupSubmit(value: any){
    if (this.candidateFormGroup.valid) {
      this.router.navigate(['/candidate-portal/view-hallticket',12,value.examCycleFormControl])
   }
  }


  getExamCycles() {
    this.baseService.getExamCycleList$() 
    .subscribe({
      next: (res: any) => {
        this.examCycleList = res.responseData;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    })
  }

}
