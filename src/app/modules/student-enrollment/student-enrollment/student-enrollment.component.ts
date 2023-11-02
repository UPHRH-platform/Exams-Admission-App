import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/core/services';
import { Tabs } from 'src/app/shared/config';
import { TableColumn } from 'src/app/interfaces/interfaces';
import { HttpErrorResponse } from '@angular/common/http';
import { BaseService } from 'src/app/service/base.service';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ToastrServiceService } from 'src/app/shared/services/toastr/toastr.service';
import autoTable from 'jspdf-autotable';
import jsPDF from 'jspdf';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { catchError } from 'rxjs/internal/operators/catchError';
import { of } from 'rxjs/internal/observable/of';

interface InstituteDetail {
  id: number | string,
  instituteName: string,
  instituteCode: string,
  address: string,
  email: string,
  allowedForExamCentre: boolean,
  district: string,
}
@Component({
  selector: 'app-student-enrollment',
  templateUrl: './student-enrollment.component.html',
  styleUrls: ['./student-enrollment.component.scss'],
})

export class StudentEnrollmentComponent {
  isDataLoading: boolean = false;
  loggedInUserRole: string;
  tabs: any[] = [];
  enrollmentTableColumns: TableColumn[] = [];
  enrollmentTableData: any[] = [];
  pageIndex = 0;
  pageSize = 10;
  length = 10;
  selectedTab: any;
  breadcrumbItems = [
    { label: 'Student Enrollment', url: '' },
  ]
  searchForm: FormGroup;
  searchParams: string;
  instituteList: any[] = [];
  courses: any[] = []
  loggedInUserId: string | number;
  years: string[] = [];
  isHallTicket: boolean = true;
  instituteDetail: InstituteDetail;
  selectedCourse: any;
  selectedAcademicYear: any;
  constructor(private router: Router, private authService: AuthServiceService,
     private baseService: BaseService, private toastrService: ToastrServiceService) { }
  ngOnInit() {
    this.loggedInUserRole = this.authService.getUserRoles()[0];
    this.loggedInUserId = this.authService.getUserRepresentation().id;
    this.isDataLoading = false;
    this.years = this.baseService.getAdmissionSessionList()
    this.initializeTabs();
    this.initializeSearchForm();
    // courses to be fetched based on institute
    if (this.loggedInUserRole === 'exams_institute') {
      this.getInstituteByuserId();
    }
    else if (this.loggedInUserRole === 'exams_secretary') {

    }
    else {
      this.getAllCourses();
      this.getAllInstitutes();
      this.getEnrollmentData();
    }
  }


  getPendingEnrollment() {

  }
  initializeSearchForm() {
    this.searchForm = new FormGroup({
      searchData: new FormControl('')
    })
  }

  getAllCourses() {
    this.baseService.getAllCourses$().subscribe({
      next: (res) => {
        console.log(res.responseData);
        console.log("courses =>", res.responseData);
        this.courses = res.responseData;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    })
  }

  getAllInstitutes() {
    this.baseService.getAllInstitutes$().subscribe({
      next: (res: any) => {
        this.instituteList = res.responseData;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message)
      }
    })
  }

  onClickItem(e: any) {
    const id = e?.id;
    this.router.navigate(['/student-enrollment/view-enrollment/' + id])
  }

  initializeTabs() {
    if (this.loggedInUserRole === 'exams_secretary') {
      this.tabs = Tabs['Student_Enrollment_Secretary'];
    }
    else {
      this.tabs = Tabs['student_enrollment'];
      this.initializeColumns();
    }
    this.selectedTab = this.tabs[0];

  }

  getEnrollmentData(instituteId?: string, courseId?: string, academicYear?: string) {
    this.enrollmentTableData = [];

  let request = {
    instituteId: instituteId !== undefined? instituteId : '',
    courseId: courseId !== undefined? courseId : '',
    academicYear: academicYear !== undefined? academicYear: '',
    verificationStatus: this.selectedTab.name === 'Approved'? 'VERIFIED' : this.selectedTab.name.toUpperCase()
  }
 if(this.loggedInUserRole === 'exams_institute') {
    request['instituteId']= this.instituteDetail?.id.toString();
 } 
  this.isDataLoading = true;
  this.baseService.getEnrollmentList(request).subscribe({
    next: (res) => {
      this.setEnrollmentTableColumns();
      this.isDataLoading = false;
      res.responseData.map((obj: any) => {
        obj.courseName = obj.course.courseName;
      })
      this.enrollmentTableData = res.responseData;
    },
    error: (error: any) => {
      this.isDataLoading = false;
      error.error.error?  this.toastrService.showToastr(error.error.error.message, 'Error', 'error', ''):  this.toastrService.showToastr('Something went wrong. Please try again later', 'Error', 'error', '');
    

    }
  })
    if (this.loggedInUserRole === 'exams_institute') {
      request['instituteId'] = this.instituteDetail?.id.toString();
    }
    this.isDataLoading = true;
    this.baseService.getEnrollmentList(request).subscribe({
      next: (res) => {
        this.isDataLoading = false;
        res.responseData.map((obj: any) => {
          obj.courseName = obj.course.courseName;
        })
        console.log(res.responseData)
        this.enrollmentTableData = res.responseData;
      },
      error: (error: any) => {
        this.isDataLoading = false;
        this.toastrService.showToastr(error.error.error.message, 'Error', 'error', '');
      }
    })
  }

  setEnrollmentTableColumns() {
    if (this.enrollmentTableColumns.length > 0) {
      if (this.selectedTab.name === 'Approved') {
        this.enrollmentTableColumns[1].header = 'Enrollment Number'
        this.enrollmentTableColumns[1].columnDef = 'enrollmentNumber'
        this.enrollmentTableColumns[1].cell = (element: Record<string, any>) => `${element['enrollmentNumber']}`
      } else {
        this.enrollmentTableColumns[1].header = 'Provisional Enrollment Number'
        this.enrollmentTableColumns[1].columnDef = 'provisionalEnrollmentNumber'
        this.enrollmentTableColumns[1].cell = (element: Record<string, any>) => `${element['provisionalEnrollmentNumber']}`
      }
    }
  }

  applySearch(searchterms:any){ 
     this.searchParams = searchterms;

  }

  initializeColumns(): void {
    this.enrollmentTableColumns = [];
    switch (this.loggedInUserRole) {
      case 'exams_institute':
        this.enrollmentTableColumns = [
          {
            columnDef: 'firstName',
            header: 'Applicant Name',
            isSortable: false,
            isLink: false,
            cell: (element: Record<string, any>) => `${element['firstName']} ${element['surname']}`
          },
          {
            columnDef: 'provisionalEnrollmentNumber',
            header: 'Provisional Enrollment Number',
            isSortable: false,
            isLink: false,
            cell: (element: Record<string, any>) => `${element['provisionalEnrollmentNumber']}`
          },
          {
            columnDef: 'course',
            header: 'Course Name',
            isSortable: false,
            isLink: false,
            cell: (element: Record<string, any>) => `${element['courseName']}`
          },
          {
            columnDef: 'enrollmentDate',
            header: 'Admission Date',
            isSortable: false,
            isLink: false,
            cell: (element: Record<string, any>) => {
              return this.baseService.reverseDate(element['enrollmentDate'])
            }
          },
          // {
          //   columnDef: 'viewStudentEnrollment',
          //   header: '',
          //   isSortable: false,
          //   isLink: true,
          //   isAction: false,
          //   cell: (element: Record<string, any>) => `View Enrollment`,
          //   cellStyle: {
          //     'background-color': '#0000000a', 'width': '145px', 'color': '#0074B6'
          //   },
          {
            columnDef: 'viewStudentEnrollment',
            header: '',
            isSortable: false,
            isLink: true,
            isAction: true,
            cell: (element: Record<string, any>) => `View Enrollment`,
            classes: ['color-blue'],
          },
        ]
        break;
      case 'exams_admin':
        this.enrollmentTableColumns = [
          {
            columnDef: 'firstName',
            header: 'Applicant Name',
            isSortable: false,
            isLink: false,
            cell: (element: Record<string, any>) => `${element['firstName']} ${element['surname']}`
          },
          {
            columnDef: 'provisionalEnrollmentNumber',
            header: 'Provisional Enrollment Number',
            isSortable: false,
            isLink: false,
            cell: (element: Record<string, any>) => `${element['provisionalEnrollmentNumber']}`
          },
          {
            columnDef: 'marks',
            header: 'Marks',
            isSortable: false,
            isLink: false,
            cell: (element: Record<string, any>) => `${element['marks']}` !== 'undefined' ? `${element['marks']}` : '-'
          },
          {
            columnDef: 'courseName',
            header: 'Course Name',
            isSortable: false,
            isLink: false,
            cell: (element: Record<string, any>) => `${element['courseName']}`
          },
          {
            columnDef: 'admissionYear',
            header: 'Admission Year',
            isSortable: false,
            isLink: false,
            cell: (element: Record<string, any>) => `${element['enrollmentDate']}`
          },
          // {
          //   columnDef: 'isLink',
          //   header: '',
          //   isSortable: false,
          //   isLink: true,
          //   cell: (element: Record<string, any>) => `View Enrollment`,
          // },
          {
            columnDef: 'viewStudentEnrollment',
            header: '',
            isSortable: false,
            isLink: true,
            isAction: true,
            classes: ['color-blue'],
            cell: (element: Record<string, any>) => `View Enrollment`,
          },
        ]
        break;
      case 'exams_secretary':
        this.enrollmentTableColumns = [
          {
            columnDef: 'firstName',
            header: 'Applicant Name',
            isSortable: false,
            isLink: false,
            cell: (element: Record<string, any>) => `${element['firstName']} ${element['surname']}`
          },
          {
            columnDef: 'provisionalEnrollmentNumber',
            header: 'Provisional Enrollment Number',
            isSortable: false,
            isLink: false,
            cell: (element: Record<string, any>) => `${element['provisionalEnrollmentNumber']}`
          },
          {
            columnDef: 'course',
            header: 'Course Name',
            isSortable: false,
            isLink: false,
            cell: (element: Record<string, any>) => `${element['courseName']}`
          },
          {
            columnDef: 'createdDate',
            header: 'Created Date',
            isSortable: false,
            isLink: false,
            cell: (element: Record<string, any>) => `${element['createdDate']}`
          },
        ]
        break;
    }

  }

  addNewEnrollment() {
    this.router.navigate(['student-enrollment/add-enrollment']);
  }

  getSelectedInstitute(event: any) {
    const selectedInsitute = event.value;
    this.getEnrollmentData(selectedInsitute, '', '');
  }

  getSelectedCourse(event: any) {
    this.selectedCourse = event.value
    this.getEnrollmentData('', this.selectedCourse, '');
  }

  getSelectedAcademicYear(event: any) {
    this.selectedAcademicYear = event.value;
    this.getEnrollmentData('', '', this.selectedAcademicYear);
  }

  onTabChange(event: MatTabChangeEvent) {
    const selectedIndex = event.index;
    this.selectedTab = this.tabs[selectedIndex];
    this.getEnrollmentData();
  }

  getInstituteByuserId() {
    if (this.loggedInUserRole === 'exams_institute') {
      console.log(this.loggedInUserRole);
      this.baseService.getInstituteDetailsByUser(this.loggedInUserId).subscribe({
        next: (res) => {
          console.log(res.responseData);
          this.instituteDetail = res.responseData[0];
          this.getEnrollmentData();
          this.getCoursesByInstitute(this.instituteDetail.id);
        }
      })
    }
  }

  getCoursesByInstitute(id: string | number) {
    const instituteId = id;
    this.baseService.getCoursesBasedOnInstitute(instituteId).subscribe({
      next: (res) => {
        this.courses = res.responseData[0].institute.courses;
      }
    })
  }

  downLoadStudentList() {

    const request = {
      instituteId: this.instituteDetail.id,
      courseId: this.selectedCourse || '',
      academicYear: this.selectedAcademicYear || '',
    }
    console.log(request)
    const toAppendPending = {
      "verificationStatus": "PENDING"
    }
    const toAppendapproved = {
      "verificationStatus": "VERIFIED"
    }
    const toAppendrejected = {
      "verificationStatus": "REJECTED"
    }
    const toAppendclosed = {
      "verificationStatus": "CLOSED"
    }

    const pendingRequest = { ...toAppendPending, ...request };
    const approvedRequest = { ...toAppendapproved, ...request };
    const rejectedRequest = { ...toAppendrejected, ...request };
    const closedRequest = { ...toAppendclosed, ...request };
    let completeData: any = [];


    forkJoin([
       this.baseService.getEnrollmentList(pendingRequest).pipe(catchError(error => of(error))), 
       this.baseService.getEnrollmentList(approvedRequest).pipe(catchError(error => of(error))),
      this.baseService.getEnrollmentList(rejectedRequest).pipe(catchError(error => of(error))),
       this.baseService.getEnrollmentList(closedRequest).pipe(catchError(error => of(error))),
      ]) 
    .subscribe({
      next: (res: any) => {
            //this will return list of array of the result
          
            for(let i in res){
              if(res[i].responseData){
                console.log(res[i].responseData)
                completeData.unshift(res[i].responseData)
              }
             
            }
            this.generatePDf(completeData.flat())
       
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
      
        }
      }
    )
    //this multiple calls approach needs to be relooked,.. doing it now for the sake of delivery
    /* this.baseService.getEnrollmentList(pendingRequest)
      .subscribe({
        next: (res: any) => {
          completeData = res.responseData;
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        }
      })

    this.baseService.getEnrollmentList(approvedRequest)
      .subscribe({
        next: (res: any) => {
          completeData.unshift(res.responseData);
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        }
      })

    this.baseService.getEnrollmentList(rejectedRequest)
      .subscribe({
        next: (res: any) => {
          completeData.unshift(res.responseData);
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        }
      })

    this.baseService.getEnrollmentList(closedRequest)
      .subscribe({
        next: (res: any) => {
          completeData.unshift(res.responseData);
          this.generatePDf(completeData.flat())
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
          this.generatePDf(completeData.flat())
        }
      }) */

  }

  generatePDf(data: any) {
    let docBody: any = []
    for (let item of data) {
      docBody.push(
        [
          item.firstName + " " + item.surname,
          item.provisionalEnrollmentNumber || "-",
          item.enrollmentNumber || "-",
          item.course.courseName,
          this.baseService.reverseDate(item.admissionDate),
          item.verificationStatus
        ]

      )
    }
    const doc = new jsPDF()
    autoTable(doc, {
      margin: { top: 50 },
      rowPageBreak: 'auto',
      bodyStyles: { valign: 'top' },
      columnStyles: {
        1: { cellWidth: 40 },
      },
      head: [['Applicant Name', 'Provisional Enrollment Number', 'Enrollment Number', 'Course Name', 'Admission Date', 'Verification Status']],
      body: docBody,
    });
    doc.save('Student_Enrollment.pdf')
  }
}
