import { HttpErrorResponse } from '@angular/common/http';
import { Component, Renderer2 } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthServiceService } from 'src/app/core/services';
import { BaseService } from 'src/app/service/base.service';
import { ToastrServiceService } from 'src/app/shared/services/toastr/toastr.service';

@Component({
  selector: 'app-download-ques-papers',
  templateUrl: './download-ques-papers.component.html',
  styleUrls: ['./download-ques-papers.component.scss']
})
export class DownloadQuesPapersComponent {
  selectedExamCycleId: any;
  loggedInUserId: string | number;
  cctvVerified: string;
  examDetails: any[] = [];
  examCycleControl = new FormControl();
  examCycleList:any = [];
  questionPapersList: any[] = [];
  examCycleValue: any;
  instituteId: string;
  breadcrumbItems = [
    {label: 'Download Question Papers', url: ''}
  ]
  constructor(
    private baseService: BaseService,private authService: AuthServiceService,
     private toastrService: ToastrServiceService,
     private renderer: Renderer2
  ) {
  }
  ngOnInit() {
    this.loggedInUserId = this.authService.getUserRepresentation().id;
    this.getExamCycleData();
    this.getInstituteData();
  }

  getInstituteData() {
    this.baseService.getInstituteDetailsByUser(this.loggedInUserId).subscribe({
      next: (res) => {
       this.instituteId = res.responseData[0].id;
      }
    })
  }

  getcctvVerificationStatus(examcycleId: string | number) {
    this.baseService.getCCTVVerificationStatus(examcycleId, this.instituteId).subscribe({
      next: (res) => {
        if(res) {
          this.cctvVerified = res.responseData[0].ApprovalStatus;
        }
      },
      error: (err) => {
        this.toastrService.showToastr(err, 'Error', 'error', '');
      }
    })
  }

  getExamCycleData() {
    this.baseService.getExamCycleList$().subscribe({
    next: (res) => {
      this.examCycleList = res.responseData;
    },
    error: (error: HttpErrorResponse) => {
      console.log(error);
      this.examCycleList = [];
    }
  })
  }

  getQuestionPapersByExamCycle() {
    this.questionPapersList = [];
    this.baseService.getQuestionPapersByExamCycle(this.examCycleValue).subscribe({
      next: (res) => {
        this.questionPapersList = res.responseData.exams;
        console.log("questionPaperList =>", this.questionPapersList);
      }
    })
  }

  examCycleSelected(e: Event) {
    console.log(e) 
    this.examCycleValue = e;
    this.getcctvVerificationStatus(this.examCycleValue);
    this.getQuestionPapersByExamCycle();
  }

  downloadQuestionPaper(questionPaper: any) {
    this.baseService.downloadQuestionPaper(questionPaper.id).subscribe({
      next: (response) => {
        const link = this.renderer.createElement('a');
        link.setAttribute('target', '_blank');
        link.setAttribute('href', response.responseData);
        link.click();
        link.remove();
      },
      error: (error) => {
        console.log( error);
        this.toastrService.showToastr(error?.error?.result?.message, 'Error', 'error', '');
      }
    });
  }

  getQuestionPapers(examCycleId: any, examId: any) {
    this.baseService.getExamsAndQuestionPapersList$().subscribe({
      next: (response) => {
        console.log("All Question Papers response", response);
      },
      error: (error) => {
        console.log("get all question paper error", error);
      }
    })
  }

  viewQuestionPapers(questionPaper: any) {
    console.log(questionPaper.id)
    this.baseService.getQuestionPaperPreviewUrl(questionPaper.id).subscribe({
      next: (response) => {
        const link = this.renderer.createElement('a');
        link.setAttribute('target', '_blank');
        link.setAttribute('href', response.responseData);
        link.click();
        link.remove();
      },
      error: (error) => {
        console.log("question paper preview url error", error);
      }
    });
  }
}
