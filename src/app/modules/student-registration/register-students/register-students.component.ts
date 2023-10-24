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
  examCycleList:any[] = [];
  examCycleControl: any;


  constructor(
    private router: Router,
    private baseService: BaseService
  ) { }



  ngOnInit(): void {
    this.examCycleControl = new FormControl('', [Validators.required]);
    this.getExamCycleData();
  }
  examCycleSelected(e: any) {
    this.examCycle = e;
    this.getQuestionPapersByExamCycle();
  }

  getExamCycleData() {
    // this.isDataLoading = true;
    this.baseService.getExamCycleList$().subscribe({
    next: (res) => {
      // this.isDataLoading = false;
      this.examCycleList = res.responseData;
      // this.examCycleData.map((obj, index) => {
      //   obj.id = obj?.id;
      //   obj.examCycleName = obj?.examCycleName
      //   console.log("exam cycle data",this.examCycleData)
      // })
    },
    error: (error: HttpErrorResponse) => {
      console.log(error);
      this.examCycleList = [];
    }
  })
  }

  getQuestionPapersByExamCycle() {
    this.questionPapersList = [];
    this.baseService.getQuestionPapersByExamCycle(this.examCycle).subscribe({
      next: (res) => {
        this.questionPapersList = res.responseData.exams;
        console.log(this.questionPapersList);
      }
    })
  }


  viewRegdStdnts(exam: QuestionPaper) {
    if (this.examCycleControl.valid) {
      this.router.navigate([`student-registration/view-regd-students/${this.examCycle}`]);
    }
  }

  regNewStdnts(exam: QuestionPaper) {
    if (this.examCycleControl.valid) {
    this.router.navigate([`student-registration/add-new-students-regn/${this.examCycle}/${exam.examName}`]);
    }
  }

}
