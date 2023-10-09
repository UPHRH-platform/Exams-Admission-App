import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { QuestionPaper } from 'src/app/interfaces/interfaces';
import { BaseService } from 'src/app/service/base.service';

@Component({
  selector: 'app-download-ques-papers',
  templateUrl: './download-ques-papers.component.html',
  styleUrls: ['./download-ques-papers.component.scss']
})
export class DownloadQuesPapersComponent {
  selectedExamCycleId: any;
  cctvVerificationStatus = 'Verified'
  examDetails: any[] = [];
  constructor(
    private baseService: BaseService,
  ) {
  }
  ngOnInit() {
    this.baseService.getExamsAndQuestionPapersList$().subscribe({
      next: (res) => {
        this.examDetails = res;
      }
    });
  }
  examCycleControl = new FormControl();
  examCycleList: string[] = ['examCycle1', 'examCycle2', 'examCycle3'];
  breadcrumbItems = [
    {label: 'Download Question Papers', url: ''}
  ]
  examCycleSelected(e: Event) {
    console.log(e)
    
  }

  downloadQuestionPaper(questionPaperId: any) {
    this.baseService.downloadQuestionPaper(questionPaperId).subscribe({
      next: (response) => {
        console.log("Download question paper response", response);
      },
      error: (error) => {
        console.log("Download question paper error", error);
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

  viewQuestionPapers(questionPaperId: any) {
    console.log("viewQuestionPaper questionPaperId",questionPaperId)
    this.baseService.getQuestionPaperPreviewUrl(questionPaperId).subscribe({
      next: (response) => {
        console.log("question paper preview url response", response);
      },
      error: (error) => {
        console.log("question paper preview url error", error);
      }
    });
  }
}
