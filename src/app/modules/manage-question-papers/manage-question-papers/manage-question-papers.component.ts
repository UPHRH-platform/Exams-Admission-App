import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthServiceService } from 'src/app/core/services';
import { QuestionPaper } from 'src/app/interfaces/interfaces';
import { BaseService } from 'src/app/service/base.service';
import { ConformationDialogComponent } from 'src/app/shared/components/conformation-dialog/conformation-dialog.component';


@Component({
  selector: 'app-manage-question-papers',
  templateUrl: './manage-question-papers.component.html',
  styleUrls: ['./manage-question-papers.component.scss']
})
export class ManageQuestionPapersComponent {

  examCycleList: string[] = ['examCycle1', 'examCycle2', 'examCycle3'];
  examCycleControl = new FormControl();
  examCycleData: any[] = [];
  examCycleDetails: any[] = [];
  loggedInUserRole = "";
  userData: any;
  examCycleValue:any;
  file:any;
  fileUploadError: string;
  listOfFiles: any[] = [];
  files: any[] = [];
  previewURL: string = "";
  

  isDataLoading: boolean = false;
  questionPapersList: QuestionPaper[] = [];
  examsList: any[] = [];
  constructor(
    private baseService: BaseService,
    private authService: AuthServiceService, 
    private dialog: MatDialog,

  ) {
    this.loggedInUserRole = this.authService.getUserRoles()[0];
    this.userData = this.authService.getUserRepresentation();
  }

  ngOnInit(): void {
    this.getExamCycleData();

  }

  breadcrumbItems = [
    { label: 'Manage Question Paper', url: '' },
  ]

  getExamCycleData() {
    this.isDataLoading = true;
    this.baseService.getExamCycleList$().subscribe({
    next: (res) => {
      this.isDataLoading = false;
      this.examCycleData = res.responseData;
    },
    error: (error: HttpErrorResponse) => {
      console.log(error);
      this.isDataLoading = false;
    }
  })
  }
  getExamCycleSelection(value:any){
    this.examCycleValue = value;
    this.getQuestionPapersByExamCycle();
  }

  getQuestionPapersByExamCycle() {
    this.examsList = [];
    this.baseService.getQuestionPapersByExamCycle(this.examCycleValue).subscribe({
      next: (res) => {
        this.questionPapersList = res.responseData.exams;
        console.log(this.questionPapersList);
      }
    })
  }

  onUploadQuesPaper(files:any){
    const request ={
      // file: files.name,
      userId: this.userData?.id,
      examCycleId: this.examCycleValue
    }
    const formData = new FormData();
        for (let [key, value] of Object.entries(request)) {
          formData.append(`${key}`, `${value}`)
      }
      formData.append("file", files, files.name);
    this.baseService.uploadQuestionPaper(formData).subscribe({
      next: (response) => {
        console.log("Upload question paper response", response);
        const dialogRef = this.dialog.open(ConformationDialogComponent, {
          data: {
            dialogType: 'success',
            description: ['Question paper uploaded successfully'],
            buttons: [
              {
                btnText: 'Ok',
                positionClass: 'center',
                btnClass: 'btn-full',
                response: true,
                // click:this.router.navigateByUrl('/manage-result/institute'),
  
              },
            ],
          },
          width: '700px',
          height: '400px',
          maxWidth: '90vw',
          maxHeight: '90vh'
        })
        dialogRef.afterClosed().subscribe(res => {
          // call API to get question paper details;
          this.getQuestionPapersByExamCycle();
        })
      },
      error: (error) => {
        console.log("Upload question paper error", error);
      }
    });
    // if(response.status === 200){
        // }
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

  viewQuestionPapers(questionPaper: any) {
    this.baseService.getQuestionPaperPreviewUrl(questionPaper?.id).subscribe({
      next: (response) => {
        console.log("question paper preview url response", response);
        this.previewURL = response.responseData;
      },
      error: (error) => {
        this.previewURL = "";
        console.log("question paper preview url error", error);
      }
    });
  }
}
