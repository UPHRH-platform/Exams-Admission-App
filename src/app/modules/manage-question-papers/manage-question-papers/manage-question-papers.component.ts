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
  

   isDataLoading: boolean = false;
   questionPapersList: QuestionPaper[] = [];

  constructor(
    private baseService: BaseService,
    private authService: AuthServiceService, 
    private dialog: MatDialog,

  ) {
    this.loggedInUserRole = this.authService.getUserRoles()[0];
    this.userData = this.authService.getUserRepresentation();
  }

  ngOnInit(): void {
    this.getQuestionPapersList();
    this.getExamCycleData();

  }

  getQuestionPapersList() {
    this.isDataLoading = true;
    this.baseService.getExamsAndQuestionPapersList$().subscribe({
      next:(res:any)=>{
        console.log(res)
        this.questionPapersList = res;
        setTimeout(() => {
          this.isDataLoading = false;
        }, 1000);

      },
      error: (error: HttpErrorResponse) => {
        this.isDataLoading = false;
        console.log(error)
      }

    })  
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
      // this.examCycleData.map((obj, index) => {
      //   obj.id = obj?.id;
      //   obj.examCycleName = obj?.examCycleName
      //   console.log("exam cycle data",this.examCycleData)
      // })
    },
    error: (error: HttpErrorResponse) => {
      console.log(error);
      this.isDataLoading = false;
    }
  })
  }
  getExamCycleSelection(value:any){
    this.examCycleValue = value
  }

  onUploadQuesPaper(files:any){
    console.log(files);
    const request ={
      file: files.name,
      userId: this.userData?.id,
      examCycleId: this.examCycleValue
    }
    const formData = new FormData();
        for (let [key, value] of Object.entries(request)) {
          formData.append(`${key}`, `${value}`)
      }
    this.baseService.uploadQuestionPaper(formData).subscribe({
      next: (response) => {
        console.log("Download question paper response", response);
      },
      error: (error) => {
        console.log("Download question paper error", error);
      }
    });
    // if(response.status === 200){
          const dialogRef = this.dialog.open(ConformationDialogComponent, {
            data: {
              dialogType: 'success',
              description: ['Internal marks uploaded successfully'],
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
          dialogRef.afterClosed().subscribe(files => {
            if (files) {
            //  this.router.navigateByUrl('/manage-result/institute')
            // console.log("hello")
            // console.log(selectedFile)
            }
          })
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

  viewQuestionPapers(questionPaperId: any) {
    console.log(questionPaperId);
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
