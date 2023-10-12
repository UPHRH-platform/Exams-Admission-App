import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, inject} from '@angular/core';
import { FormGroup ,AbstractControl, FormControl, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { ToastrServiceService } from 'src/app/shared/services/toastr/toastr.service';
import { BaseService } from 'src/app/service/base.service';
import { HttpErrorResponse } from '@angular/common/http';
// import { DateTime } from 'luxon';

export interface Exam {
  examName: string | undefined | null;
  examDate:string | undefined | null;
  startTime:string | undefined | null;
  endTime:string | undefined | null;
  id?: number;
  course?: any;
}
@Component({
  selector: 'app-manage-exam-cycle-form',
  templateUrl: './manage-exam-cycle-form.component.html',
  styleUrls: ['./manage-exam-cycle-form.component.scss']
})
export class ManageExamCycleFormComponent {
  exams: Exam[]=[];
  examsToAdd: Exam[]=[];
  courses: any[]= [];
  startMinTime:"08:00";
  startMaxTime: "24:00";
  savingDetails = false;
  announcer = inject(LiveAnnouncer);
  endDateError: boolean = false;
  endTimeError: boolean = false;
  pickerMinDate = new Date(new Date().setHours(0, 0, 0, 0));
  createExamCycle = new FormGroup({
    'examCycleName':new FormControl('', Validators.required),
    'courseId':new FormControl('', Validators.required),
    'startDate':new FormControl('', Validators.required),
    'endDate':new FormControl('',Validators.required),
  });
  createExamForm = new FormGroup({
    'examName':new FormControl('', Validators.required),
    'examDate':new FormControl('', Validators.required),
    'startTime':new FormControl('', Validators.required),
    'endTime':new FormControl('', Validators.required),
  })
  breadcrumbItems = [
    { label: 'Manage Exam Cycles and Exams', url: '' },
  ]
  examcycleId: string;
  examCycleDetails: any = {};
  subjects: any = [];
  constructor(
    private router: Router, 
    private toasterService: ToastrServiceService,
    private baseService: BaseService,
    private route: ActivatedRoute
    ) {
      this.route.params.subscribe(param => {
        this.examcycleId = param['id'];
      })
  }
 
  
  ngOnInit(){
   this.getAllCourses();
   if(this.examcycleId !== undefined) {
    this.getExamCycleDetailsById();
   }
 }

 getAllCourses() {
  this.baseService.getAllCourses$().subscribe({
    next: (res) => {
      this.courses = res.responseData
    },
    error: (error: HttpErrorResponse) => {
      console.log(error);
    }
  })
 }

 getExamsByExamCycle() {
  this.baseService.getExamsByExamCycleId(this.examcycleId).subscribe({
    next: (res) => {
      this.exams = res.responseData;
    },
    error: (err: HttpErrorResponse) => {
      this.exams = [];
      // this.toasterService.showToastr(err, 'Error', 'error', '');
    }
  })
 }

 initializeFormValues() {
  this.createExamCycle.patchValue({
    'examCycleName': this.examCycleDetails?.examCycleName,
    'courseId': this.examCycleDetails?.course.id,
    'startDate': this.examCycleDetails?.startDate,
    'endDate': this.examCycleDetails?.endDate,
  })
  
 }

 getExamCycleDetailsById() {
  this.baseService.getExamCycleDetails(this.examcycleId).subscribe({
    next:(res) => {
        this.examCycleDetails = res.responseData;
        this.initializeFormValues();
        this.getExamsByExamCycle();
       
    },
    error:(err: HttpErrorResponse) => {
      console.log(err);
      this.toasterService.showToastr('Something went wrong. Please try again', 'Error', 'error', '');
    }
  })
 }

 convertDateFormat(date: any) {
  const dateString = new Date(date);
  const formattedDate = dateString.getFullYear()  + '-'
             + ('0' + (dateString.getMonth()+1)).slice(-2) + '-'
             + ('0' + dateString.getDate()).slice(-2);
  return formattedDate;
}

 
 addNewExam() {
   const examCycleValue = this.createExamCycle.value;
   const {examName, examDate, startTime, endTime} = this.createExamForm.value;
   const  {courseId, startDate, endDate} = this.createExamCycle.value;
   const selectedCourse= this.courses.find(course => course.id === courseId);
   const examDetail = {
    examName: examName,
    examDate: this.convertDateFormat(examDate),
    startTime: startTime ? startTime : '10:00 AM',
    endTime: endTime ? endTime: '10:00 PM',
    course: selectedCourse
   }
   this.exams.push(examDetail);
   this.examsToAdd.push(examDetail);
 }

  onSubmit(value: any){
    const {examCycleName, courseId, startDate, endDate} = this.createExamCycle.value;
    const examCycleDetail= {
      examCycleName,
      course: {
        id: courseId,
      },
      startDate: this.convertDateFormat(startDate),
      endDate: this.convertDateFormat(endDate),
    };
    this.savingDetails = true;
    // console.log(examCycleDetail);
    if(this.examcycleId === undefined) {
    this.baseService.createExamCycle(examCycleDetail).subscribe({
      next: (res) => {
        const examCycleId = res.responseData.id;
        if(examCycleId && this.exams.length > 0) {
          this.createExams(examCycleId);
        }
        else {
          this.toasterService.showToastr('Exam cycle created successfully', 'Success', 'success', '');
          this.router.navigate(['/manage-exam-cycle']);
        }
      },
      error: (err: HttpErrorResponse) => {
        this.toasterService.showToastr(err, 'Error', 'error', '');
      }
    })
  } 
  else {
    this.updateExamCycleDetails(examCycleDetail);
  }
  }

  //   this.baseService.createExamCycle(examCycleDetail).pipe(
  //     switchMap((examCycleResponse) => {
  //       alert("1");
  //       const examCycleId = examCycleResponse.responseData.id; 
  
  //       // Call the createExam API with examCycleId
  //       return this.baseService.createExam(this.exams, examCycleId);
  //     })
  //   ).subscribe({
  //     next: (res) => {
  //       this.examsToAdd = [];
  //       this.toasterService.showToastr("Exam Cycle and Exam is created successfully!", 'Success', 'success', '');
  //       this.savingDetails = false;
  //       this.router.navigate(['/manage-exam-cycle'])
  //     },
  //   });
  // }

  createExams(examCycleId: string | number) {
    this.baseService.createExam(this.exams, examCycleId).subscribe({
      next: (res) => {
        this.toasterService.showToastr('Exam cycle and Exams created successfully', 'Success', 'success', '');
        this.examsToAdd = [];
        this.savingDetails = false;
        this.router.navigate(['/manage-exam-cycle']);
      },
      error: (err: HttpErrorResponse) => {
        this.toasterService.showToastr(err, 'Error', 'error', '');
      }
    })
  }
      

 remove(exam:Exam): void{
   const index = this.exams.indexOf(exam);
   if(index >= 0){
     this.exams.splice(index, 1);
     this.examsToAdd.splice(index, 1);
     this.announcer.announce('Removed ${exam}');
     
   } else {
    const index = this.exams.indexOf(exam);
    if(index >= 0) {
      // delete exam using delete exam service
    }
   }
 }


  goBack() {
    this.router.navigate(['/manage-exam-cycle']);
  }


  startDateChangeEvent(input: string, event: Event) {
    this.endDateError = false;
    const startdate = this.createExamCycle.value.startDate;
    const enddate = this.createExamCycle.value.endDate;
    if(enddate !== '' && enddate && startdate) {
      if(enddate < startdate) {
        // this.createExamCycle.controls['endDate'].setErrors({'incorrect': true})
        this.endDateError = true;
      }
    }
  }

  endDateChangeEvent(input: string, event: Event) {
    this.endDateError = false;
    const startdate = this.createExamCycle.value.startDate;
    const enddate = this.createExamCycle.value.endDate;
    if(startdate !== '' && enddate && startdate) {
      if(enddate < startdate) {
        this.endDateError = true;
      }
    }
  }

  startTimeChangeEvent(event: Event) {
    this.endTimeError = false;
    const starttime = this.createExamForm.value.startTime;
    const endtime = this.createExamForm.value.endTime;
    if(starttime !== '' && endtime && starttime) {
      if(endtime < starttime) {
        this.endTimeError = true;
      }
    }
  }

  endTimeChangeEvent(event: Event) {
    this.endTimeError = false;
    const starttime = this.createExamForm.value.startTime;
    const endtime = this.createExamForm.value.endTime;
    if(starttime !== '' && endtime && starttime) {
      if(endtime < starttime) {
        this.endTimeError = true;
      }
    }
  }
  
  updateExamCycleDetails(request: object) {
    this.baseService.updateExamCycleDetails(request, this.examcycleId).subscribe({
      next: (res) => {
        this.toasterService.showToastr('Exam cycle details updated successfully', 'Success', 'success', '');
        if(this.exams.length > 0) {
          this.baseService.updateExamsForExamCycle(this.examcycleId, this.exams).subscribe({
            next: (res) => {
              console.log(res);
            }
          });
        }
        this.router.navigate(['/manage-exam-cycle']);
      },
      error: (err: HttpErrorResponse) => {
        this.toasterService.showToastr(err, 'Error', 'error', '');
      }
    })
  }

  getSubjectsByCourse(courseId: string | number) {
    this.subjects = [];
    this.baseService.getSubjectsByCourse(courseId).subscribe({
      next: (res) => {
        this.subjects = res.responseData.subjects;
      }
    })
  }

  getSelectedCourse(event: any) {
    if(this.createExamCycle.value.courseId) {
    this.getSubjectsByCourse(this.createExamCycle.value.courseId);
    }
  }
 }

