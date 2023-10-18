import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Exam, QuestionPaper } from 'src/app/interfaces/interfaces';
import { FormControl,  Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/core/services';
import { MatDialog } from '@angular/material/dialog';
import { ConformationDialogComponent } from '../conformation-dialog/conformation-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-shared-ques-paper',
  templateUrl: './shared-ques.component.html',
  styleUrls: ['./shared-ques.component.scss']
})
export class SharedQuestionPaperComponent {
  examCycle: string;
  downloadComponent: boolean = true;
  constructor(
    private authService: AuthServiceService, private router: Router
  ) { }
  file:any;
   fileUploadError: string;
   listOfFiles: any[] = [];
   files: any[] = [];
   currentDate = new Date();
   currentTime = new Date().getMinutes();
  formattedDate: any;
  currentRoute: any;
  lessTime = new Date(this.currentDate).getMinutes() - 30;
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
   console.log(this.lessTime)
   console.log(this.currentTime);
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

  formatBytes(bytes: any, decimals = 2) {
    if (!+bytes) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  }

  emitUploadQuesPaper(event: any) {
    
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
        // validate file size to be less than 2mb if the file has a valid extension
        if (fileSize < 2000000) {
          if (this.listOfFiles.indexOf(selectedFile?.name) === -1) {
            this.files.push(selectedFile);
            this.listOfFiles.push(
              selectedFile.name.concat(this.formatBytes(selectedFile.size))
            );
          } else {
            console.log('file already exists');
          }
        } else {
          this.fileUploadError = 'Please upload files with size less than 2MB';
        }
      } else {
        this.fileUploadError = `Please upload ${allowedExtensions.join(', ')} files`;
      }
      // if (this.examCycleControl.valid) {
         this.uploadQuesPaper.emit(selectedFile);
    // }
    }
  //     

  emitViewQuestionPaper(event: QuestionPaper) {
    this.viewQuestionPaper.emit(event);
   // console.log(this.viewQuestionPaper)
  }

  emitDownloadQuestionPaper(event: QuestionPaper) {
    this.downloadQuestionPaper.emit(event);
}

}
