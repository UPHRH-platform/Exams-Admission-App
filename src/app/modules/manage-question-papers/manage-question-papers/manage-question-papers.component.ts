import { HttpErrorResponse } from '@angular/common/http';
import { Component, Renderer2 } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthServiceService } from 'src/app/core/services';
import { QuestionPaper } from 'src/app/interfaces/interfaces';
import { BaseService } from 'src/app/service/base.service';
import { ConformationDialogComponent } from 'src/app/shared/components/conformation-dialog/conformation-dialog.component';
import { ToastrServiceService } from 'src/app/shared/services/toastr/toastr.service';


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
  

  isDataLoading: boolean = false;
  questionPapersList: QuestionPaper[] = [];
  examsList: any[] = [];
  constructor(
    private baseService: BaseService,
    private authService: AuthServiceService, 
    private dialog: MatDialog,
    private renderer: Renderer2,
    private toastrService: ToastrServiceService

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
      this.toastrService.showToastr('Something went wrong. Please try again later', 'Error', 'error', '');
          
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
        this.questionPapersList = res.responseData.exams.reverse();
        console.log(this.questionPapersList);
      }
    })
  }

  onUploadQuesPaper(detilas:any){
    const request ={
      // file: files.name,
      userId: this.userData?.id,
      examCycleId: this.examCycleValue,
      examId: detilas.examId
    }
    const formData = new FormData();
        for (let [key, value] of Object.entries(request)) {
          formData.append(`${key}`, `${value}`)
      }
      formData.append("file", detilas.file, detilas.file.name);
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
    

  downloadQuestionPaper(questionPaper: any) {
    this.baseService.downloadQuestionPaper(questionPaper.id).subscribe({
      next: (response) => {
        console.log("Download question paper response", response);
      },
      error: (error) => {
        console.log("Download question paper error", error);
      }
    });
  }

  deleteQuestionPaper(questionPaper: any) {
    this.baseService.deleteQuestionPaper(questionPaper.id).subscribe({
      next: (response) => {
        const dialogRef = this.dialog.open(ConformationDialogComponent, {
          data: {
            dialogType: 'success',
            description: [response.responseData],
            buttons: [
              {
                btnText: 'Ok',
                positionClass: 'center',
                btnClass: 'btn-full',
                response: true,
  
              },
            ],
          },
          width: '700px',
          height: '400px',
          maxWidth: '90vw',
          maxHeight: '90vh'
        })
        dialogRef.afterClosed().subscribe(res => {
          this.getQuestionPapersByExamCycle();
        })
      },
      error: (error) => {
      }
    });
  }

  viewQuestionPapers(questionPaper: any) {
    this.baseService.getQuestionPaperPreviewUrl(questionPaper?.id).subscribe({
      next: (response) => {
        console.log("question paper preview url response", response);
        //console.log(data)
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
