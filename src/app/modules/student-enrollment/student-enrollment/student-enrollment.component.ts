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
import { mergeMap } from 'rxjs';

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
  institute = new FormControl();
  constructor(private router: Router, private authService: AuthServiceService,
    private baseService: BaseService, private toastrService: ToastrServiceService) { }
  ngOnInit() {
    // this.getPendingList()
    this.loggedInUserRole = this.authService.getUserRoles()[0];
    this.loggedInUserId = this.authService.getUserRepresentation().id;
    this.isDataLoading = false;
    this.getAdmissionSessionList();
    this.initializeTabs();
    this.initializeSearchForm();
    // courses to be fetched based on institute
    if (this.loggedInUserRole === 'exams_institute') {
      this.getInstituteByuserId();
    }
    else if (this.loggedInUserRole === 'exams_superadmin') {
      
      this.loadSuperAdminScreenDetails();
    }
    else {
      this.getAllCourses();
      this.getAllInstitutes();
      // this.getEnrollmentData();
    }
  }

  getLongPendingStudentEnrollmentList(courseId?: number, session?: string) {
    this.baseService.getLongPendingStudentEnrollmentList$(courseId,session).subscribe({
      next: (res) => {
        this.enrollmentTableData = res.responseData;
       },
      error: (err) => {
        console.log(err)
        this.toastrService.showToastr(err.error.error.message, 'Error', 'error', '')
       //    this.enrollmentTableData =[{"id":22,"keycloakId":null,"session":"2023-2024","examBatch":"26","admissionDate":"2023-10-31","firstName":"Saranya","surname":"Selvaraj","motherName":"Visa","fatherName":"Selva","dateOfBirth":"2000-05-27","gender":"Female","caste":"General","category":"Freedom Fighter Dependant","intermediatePassedBoard":"U.P. BOARD OF HIGH SCHOOL, ALLAHABAD","intermediateSubjects":"Physics,Biotechnology","intermediatePercentage":80,"mobileNo":"9952149539","emailId":"dharani255558@gmail.com","aadhaarNo":"765487659876","address":"2/127, south street","pinCode":"641687","country":"India","state":"Tamil Nadu","district":"Tirupur","highSchoolMarksheetPath":"https://storage.googleapis.com/download/storage/v1/b/dev-public-upsmf/o/exam%2F1698819881503_Certificate%20(2).pdf?generation=1698819881731988&alt=media","highSchoolCertificatePath":"https://storage.googleapis.com/download/storage/v1/b/dev-public-upsmf/o/exam%2F1698819881753_file-example_PDF_1MB.pdf?generation=1698819881933229&alt=media","intermediateMarksheetPath":"https://storage.googleapis.com/download/storage/v1/b/dev-public-upsmf/o/exam%2F1698819881950_file-example_PDF_1MB.pdf?generation=1698819882138316&alt=media","intermediateCertificatePath":"https://storage.googleapis.com/download/storage/v1/b/dev-public-upsmf/o/exam%2F1698819882156_file-example_PDF_1MB.pdf?generation=1698819882341068&alt=media","highSchoolRollNo":"345354","highSchoolYearOfPassing":"2020","intermediateRollNo":"255558","intermediateYearOfPassing":"2023","verificationStatus":"PENDING","provisionalEnrollmentNumber":"MEC103-01bfd21b-0984-405a-9682-43ccb3374712","adminRemarks":null,"enrollmentDate":"2023-11-01","verificationDate":"2023-11-01","verifiedBy":null,"requiresRevision":false,"enrollmentNumber":null,"course":{"id":1,"courseCode":"MEC103","courseName":"Mathematics","description":"This course covers the fundamentals of computer science.","courseYear":null,"subjects":[{"id":1,"subjectCode":"MATH101","subjectName":"Mathematics 101","description":"Introduction to Mathematics","createdBy":"JohnDoe","createdOn":"2023-10-11T05:46:29.109+00:00","modifiedBy":"JaneDoe","modifiedOn":"2023-10-10T15:00:00.000+00:00","obsolete":0},{"id":2,"subjectCode":"MATH102","subjectName":"Mathematics 102","description":"Physiology is the study of how the human body works","createdBy":null,"createdOn":"2023-10-24T08:43:48.354+00:00","modifiedBy":null,"modifiedOn":null,"obsolete":0}]},"instituteDTO":null,"examCenter":null,"intermediateStream":"U.P. BOARD","courseName":"Mathematics"},{"id":21,"keycloakId":null,"session":"2023-2024","examBatch":"26","admissionDate":"2023-10-31","firstName":"Saranya","surname":"Selvaraj","motherName":"Visa","fatherName":"Selva","dateOfBirth":"2000-05-27","gender":"Female","caste":"General","category":"Freedom Fighter Dependant","intermediatePassedBoard":"U.P. BOARD OF HIGH SCHOOL, ALLAHABAD","intermediateSubjects":"Physics,Biotechnology","intermediatePercentage":80,"mobileNo":"9952149539","emailId":"dharuamuthu@gmail.com","aadhaarNo":"765487659876","address":"2/127, south street","pinCode":"641687","country":"India","state":"Tamil Nadu","district":"Tirupur","highSchoolMarksheetPath":"https://storage.googleapis.com/download/storage/v1/b/dev-public-upsmf/o/exam%2F1698819875085_Certificate%20(2).pdf?generation=1698819875353903&alt=media","highSchoolCertificatePath":"https://storage.googleapis.com/download/storage/v1/b/dev-public-upsmf/o/exam%2F1698819875375_file-example_PDF_1MB.pdf?generation=1698819875581157&alt=media","intermediateMarksheetPath":"https://storage.googleapis.com/download/storage/v1/b/dev-public-upsmf/o/exam%2F1698819875598_file-example_PDF_1MB.pdf?generation=1698819875795951&alt=media","intermediateCertificatePath":"https://storage.googleapis.com/download/storage/v1/b/dev-public-upsmf/o/exam%2F1698819875812_file-example_PDF_1MB.pdf?generation=1698819875992115&alt=media","highSchoolRollNo":"345354","highSchoolYearOfPassing":"2020","intermediateRollNo":"255558","intermediateYearOfPassing":"2023","verificationStatus":"PENDING","provisionalEnrollmentNumber":"MEC103-995de4a7-2c3a-47f4-87da-f244cd29f9cc","adminRemarks":null,"enrollmentDate":"2023-11-01","verificationDate":"2023-11-01","verifiedBy":"c86d6f67-d03f-450c-b474-4d31fd9e7c3f","requiresRevision":false,"enrollmentNumber":null,"course":{"id":1,"courseCode":"MEC103","courseName":"Mathematics","description":"This course covers the fundamentals of computer science.","courseYear":null,"subjects":[{"id":1,"subjectCode":"MATH101","subjectName":"Mathematics 101","description":"Introduction to Mathematics","createdBy":"JohnDoe","createdOn":"2023-10-11T05:46:29.109+00:00","modifiedBy":"JaneDoe","modifiedOn":"2023-10-10T15:00:00.000+00:00","obsolete":0},{"id":2,"subjectCode":"MATH102","subjectName":"Mathematics 102","description":"Physiology is the study of how the human body works","createdBy":null,"createdOn":"2023-10-24T08:43:48.354+00:00","modifiedBy":null,"modifiedOn":null,"obsolete":0}]},"instituteDTO":null,"examCenter":null,"intermediateStream":"U.P. BOARD","courseName":"Mathematics"}]
      }
    })
  }

  loadSuperAdminScreenDetails() {
    forkJoin([
      this.getAllCourses(),
      this.getLongPendingStudentEnrollmentList()
    ]).subscribe({
      next: (res: any) => {
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);

      }
    }
    )
  }

  getAdmissionSessionList() {
    this.years = this.baseService.getAdmissionSessionList()
    this.selectedAcademicYear = this.years[4]
  }

  initializeSearchForm() {
    this.searchForm = new FormGroup({
      searchData: new FormControl('')
    })
  }

  getAllCourses() {
    this.baseService.getAllCourses$()
      .pipe(mergeMap((res) => {
        const courses: any = []
        if (res.responseData) {
          res.responseData.forEach((elemment: any) => {
            const course = {
              courseCode: elemment.courseCode,
              courseName: elemment.courseName,
              course_id: elemment.id,
            }
            courses.push(course)
          })
        }
        return of(courses)
      }))
      .subscribe({
        next: (res) => {
         // console.log("courses =>", res);
          this.courses = res;
          console.log("courses =>", this.courses[0]);
          this.selectedCourse = this.courses[0].course_id
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
        if (this.instituteList.length > 0) {
          console.log(this.instituteList.length-1)
          this.institute.patchValue(this.instituteList[this.instituteList.length - 2].id)
          
          this.getCoursesByInstitute(this.institute.value)
        }
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
    else if (this.loggedInUserRole === 'exams_superadmin') {
      this.tabs = Tabs['student_Enrollment_dgme']
      this.initializeColumns();

    }
    else {
      this.tabs = Tabs['student_enrollment'];
      this.initializeColumns();
    }
    this.selectedTab = this.tabs[0];

  }

  getEnrollmentData(academicYear?: string) {
    this.enrollmentTableData = [];

    let request = {
      instituteId: this.institute.value !== undefined ? this.institute.value : '',
      courseId: this.selectedCourse !== undefined ? this.selectedCourse : '',
      academicYear: this.selectedAcademicYear !== undefined ? this.selectedAcademicYear : '',
      verificationStatus: this.selectedTab.name === 'Approved' ? 'VERIFIED' : this.selectedTab.name.toUpperCase()
    }
    if (this.loggedInUserRole === 'exams_institute') {
      request['instituteId'] = this.instituteDetail?.id.toString();
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
      error: (error: HttpErrorResponse) => {
        this.isDataLoading = false;
        error.error.error ? this.toastrService.showToastr(error.error.error.message, 'Error', 'error', '') : this.toastrService.showToastr('Something went wrong. Please try again later', 'Error', 'error', '');


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
       // localStorage.setItem("hhh",JSON.stringify(this.enrollmentTableData))
      },
      error: (error: any) => {
        this.isDataLoading = false;
        this.toastrService.showToastr(error.message, 'Error', 'error', '');
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

  applySearch(searchterms: any) {
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
      case 'exams_superadmin':
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
            columnDef: 'admissionYear',
            header: 'Admission Year',
            isSortable: false,
            isLink: false,
            cell: (element: Record<string, any>) => `${element['enrollmentDate']}`
          },
          {
            columnDef: 'createdDate',
            header: 'Created Date',
            isSortable: false,
            isLink: false,
            cell: (element: Record<string, any>) => `${element['createdDate']}`
          },
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
    }

  }

  addNewEnrollment() {
    this.router.navigate(['student-enrollment/add-enrollment']);
  }

  getSelectedCourse(event: any) {
    this.selectedCourse = event.value
    this.loggedInUserRole === 'exams_superadmin' ? this.getLongPendingStudentEnrollmentList(event.value,this.selectedAcademicYear) : this.getEnrollmentData();
    
  }

  getSelectedAcademicYear(event: any) {
    this.selectedAcademicYear = event.value;
    this.getEnrollmentData();
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
          // this.getEnrollmentData();
          this.getCoursesByInstitute(this.instituteDetail.id);
        }
      })
    }
  }

  getCoursesByInstitute(id: string | number) {
    const instituteId = id;
    this.courses = [];
    this.selectedCourse = undefined
    this.baseService.getCoursesBasedOnInstitute(instituteId).subscribe({
      next: (res) => {
        this.courses = res.responseData[0].institute.courses;
        this.selectedCourse = this.courses[this.courses.length - 1].course_id
        this.getEnrollmentData()
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

          for (let i in res) {
            if (res[i].responseData) {
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
