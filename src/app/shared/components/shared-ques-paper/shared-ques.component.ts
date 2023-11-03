import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Exam, QuestionPaper } from 'src/app/interfaces/interfaces';
import { FormControl,  Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/core/services';
import { MatDialog } from '@angular/material/dialog';
import { ConformationDialogComponent } from '../conformation-dialog/conformation-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseService } from 'src/app/service/base.service';

@Component({
  selector: 'app-shared-ques-paper',
  templateUrl: './shared-ques.component.html',
  styleUrls: ['./shared-ques.component.scss']
})
export class SharedQuestionPaperComponent {
  examCycle: string;
  downloadComponent: boolean = true;
  constructor(
    private authService: AuthServiceService, private router: Router,
    private baseService: BaseService
  ) { }
  file:any;
   fileUploadError: string;
   listOfFiles: any[] = [];
   files: any[] = [];
   currentDate = new Date();
  formattedDate: any;
  currentRoute: any;
  @Input() examCycleList : string[] ;
  @Input() examCycleControl: FormControl;
  @Input() questionPapersList : QuestionPaper[];
  @Input() showCardDetails : boolean;
  @Input() examsList: Exam[];
  @Input() previewURL: string;
  @Input() cctvVerified: string; 
  @Output() viewRegdStdnts: EventEmitter<any> = new EventEmitter<any>();//view regd students
  @Output() addNewStdnts: EventEmitter<any> = new EventEmitter<any>();//add new students
  @Output() uploadQuesPaper: EventEmitter<any> = new EventEmitter<any>();//upload ques paper
  @Output() viewQuestionPaper: EventEmitter<any> = new EventEmitter<any>();//view ques paper
  @Output() downloadQuestionPaper: EventEmitter<any> = new EventEmitter<any>();//download ques paper
  @Output() deleteQuestionPaper: EventEmitter<any> = new EventEmitter<any>();//delete ques paper
  @Output() examCycleSelection: EventEmitter<any> = new EventEmitter<any>();
  
  loggedInUserRole: string;
  ngOnInit(): void {
    this.loggedInUserRole = this.authService.getUserRoles()[0];
    this.formattedDate = this.currentDate.getFullYear()  + '-'
   + ('0' + (this.currentDate.getMonth()+1)).slice(-2) + '-'
   + ('0' + this.currentDate.getDate()).slice(-2);
   this.currentRoute = this.router.url;
   if(this.router.url === '/student-registration/institute') {
    this.downloadComponent = false;
   }
  }

  getTime(timeString: any) {
    const time = new Date(timeString).getMinutes();
    return time;
  }

  examCycleSelected(e: any) {
    this.examCycle = e.value;
    this.examCycleSelection.emit(e.value);
  }


  emitViewRegdStdnts(questionPaper: QuestionPaper) {
    if (this.examCycleControl.valid) {
      this.viewRegdStdnts.emit(questionPaper);
     // this.router.navigate(['student-registration/view-regd-students'], { state: { examId: exam.examId, examCycle: this.examCycle, examName: exam.examName } });
    }

  }

  emitRegNewStdnts(questionPaper: QuestionPaper) {
    if (this.examCycleControl.valid) {
      this.addNewStdnts.emit(questionPaper);
   // this.router.navigate(['student-registration/add-new-students-regn'], { state: { examId: exam.examId, examCycle: this.examCycle, examName: exam.examName } });
    }
  }

  emitUploadQuesPaper(event: any, examId: string) {
    this.fileUploadError = '';
      let selectedFile = event.target.files[0];
      // const formData = new FormData();
      // for (var i = 0; i < this.fileList.length; i++) {
      //   formData.append("files", this.fileList[i]);
      //   }
      const extension = selectedFile.name.split('.').pop();
      const fileSize = selectedFile.size;
      const allowedExtensions = ['pdf'];
      if (allowedExtensions.includes(extension)) {
        // validate file size to be less than 1mb if the file has a valid extension
        if (fileSize < 1000000) {
          if (this.listOfFiles.indexOf(selectedFile?.name) === -1) {
            this.files.push(selectedFile);
            this.listOfFiles.push(
              selectedFile.name.concat(this.baseService.formatBytes(selectedFile.size))
            );
            const details = {
              file: selectedFile,
              examId: examId
            }
            this.uploadQuesPaper.emit(details);
          } else {
            console.log('file already exists');
          }
        } else {
          this.fileUploadError = 'Please upload files with size less than 1MB';
        }
      } else {
        this.fileUploadError = `Please upload ${allowedExtensions.join(', ')} files`;
      }
    }
  //     

  emitViewQuestionPaper(event: QuestionPaper) {
    this.viewQuestionPaper.emit(event);
   // console.log(this.viewQuestionPaper)
  }

  emitDownloadQuestionPaper(event: QuestionPaper) {
    this.downloadQuestionPaper.emit(event);
}

  emitDeleteQuestionPaper(event: QuestionPaper) {
    this.deleteQuestionPaper.emit(event);
  }

}
