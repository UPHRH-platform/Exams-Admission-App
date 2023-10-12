import { Component } from '@angular/core';
import { QuestionPaper } from 'src/app/interfaces/interfaces';
import { Router } from '@angular/router';
import { FormControl,  Validators } from '@angular/forms';

import { BaseService } from 'src/app/service/base.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register-students',
  templateUrl: './register-students.component.html',
  styleUrls: ['./register-students.component.scss']
})
export class RegisterStudentsComponent {
  examCycle: string;
  breadcrumbItems = [
    { label: 'Register Students to Exam cycles and Exams', url: '' }
  ]
  questionPapersList: QuestionPaper[]=[];
  examCycleList = [
    {
      id: 1,
      examCycleName:'examCycle1'
    },
    {
      id: 2,
      examCycleName:'examCycle2'
    },
    {
      id: 3,
      examCycleName:'examCycle3'
    }];
  examCycleControl: any;


  constructor(
    private router: Router,
    private baseService: BaseService
  ) { }



  ngOnInit(): void {
    this.examCycleControl = new FormControl('', [Validators.required]);
    this.getQuestionPapersList();
  }

  getQuestionPapersList() {
    this.baseService.getExamsAndQuestionPapersList$().subscribe({
      next:(res:any)=>{
        this.questionPapersList = res;
        setTimeout(() => {
        }, 1000);

      },
      error: (error: HttpErrorResponse) => {
        console.log(error)
      }

    })  
  } 

  examCycleSelected(e: any) {
    console.log(e.value)
    this.examCycle = e.value;
  }


  viewRegdStdnts(exam: QuestionPaper) {

    if (this.examCycleControl.valid) {
      this.router.navigate(['student-registration/view-regd-students'], { state: { examId: exam.examId, examCycle: this.examCycle, examName: exam.examName } });
    }

  }

  regNewStdnts(exam: QuestionPaper) {
    if (this.examCycleControl.valid) {
    this.router.navigate(['student-registration/add-new-students-regn'], { state: { examId: exam.examId, examCycle: this.examCycle, examName: exam.examName } });
    }
  }

}
