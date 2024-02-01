
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
 
import { ActivatedRoute, Router } from '@angular/router';
import { RegdStudentsTableData, TableColumn, Course, Year } from 'src/app/interfaces/interfaces';
import { ConfirmStudentRegistrationComponent } from '../dialogs/confirm-student-registration/confirm-student-registration.component';
import { AuthServiceService } from 'src/app/core/services';
import { BaseService } from 'src/app/service/base.service';
import { ToastrServiceService } from 'src/app/shared/services/toastr/toastr.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl } from '@angular/forms';
 
@Component({
  selector: 'app-add-new-regn',
  templateUrl: './add-new-regn.component.html',
  styleUrls: ['./add-new-regn.component.scss']
})
export class AddNewRegnComponent {
  stateData : any;  
  searcKey: string = '';
  studentsToRegister: any = [];
  loggedInUserId: string;
  breadcrumbItems = [
    { label: 'Register Students to Exam cycles and Exams', url: '' }
  ]
  examCycleId: any;
  enrollmentData: any[] = [];
  examName: string;
  finalRegistrationRequest: any[] = [];
  examId: string;
  selectedCourse: any;
  selectedAcademicYear: any;
  examCycleFormControl = new FormControl();
  examCycleList = []
  filtersNotSet = true;
  years: Year[] = [];
  courses: Course[];
  courseFormControl = new FormControl();
  yearFormControl= new FormControl();
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthServiceService,
    private baseService: BaseService,
    private toastr: ToastrServiceService,
    private route: ActivatedRoute
    ){
        this.route.params.subscribe((params => {
          this.examCycleId = params['id'];
          this.examName = params['examName'];
          this.examId = params['examID'];
        }))
  }
 
  viewStudentsTableColumns: TableColumn[] = [];
  isDataLoading: boolean = false;
  regdStudents : RegdStudentsTableData[] = [];
  ngOnInit(): void {
    this.loggedInUserId = this.authService.getUserRepresentation().id;
    this.initializeColumns();
    this.getInstituteDetails();
    this.getExamCycles();
    this.getAdmissionSessionList();
    this.getCoursesList()
    // this.getRegdStudents(this.stateData?.examId, this.stateData?.examCycle);
  }
  // get institute detail
  getInstituteDetails() {
    this.baseService.getInstituteDetailsByUser(this.loggedInUserId).subscribe({
      next: (res) => {
        const instituteId = res.responseData[0].id;
        this.getUnregisteredList(this.examCycleId, instituteId);
        // this.getEnrollmentData(instituteId);
      }
    })
  }
  // get enrollment based on institute
  getUnregisteredList(examCycleId: string, instituteId: string, ) {
    this.isDataLoading = true;
    this.baseService.getRegistrationPendingStudents(examCycleId, instituteId).subscribe({
      next: (res) => {
        this.isDataLoading = false;
        this.enrollmentData = res.responseData;
      },
      error: (error: any) => {
        this.isDataLoading = false;
        this.toastr.showToastr(error.error.error.message, 'Error', 'error', '');
      }
    })
    }
 
  onSelectedRows(value: any) {
    console.log("value ===>", value);
    this.studentsToRegister = value;
    console.log("studentstoregister =>", this.studentsToRegister);
  }
 
  getSelectedExamcycleId(e: any) {
    //this.getFeeDetailsByExamCycle(e)
  }
 
  getExamCycles() {
    this.baseService.getExamCycleList$()
      .subscribe({
        next: (res: any) => {
          this.examCycleList = res.responseData;
          const lastIndexSelected: any = this.examCycleList[this.examCycleList.length - 1];
          this.examCycleFormControl.setValue(lastIndexSelected.id)
         // this.getFeeDetailsByExamCycle(lastIndexSelected.id)
        },
        error: (error: HttpErrorResponse) => {
         
          console.log(error);
           this.toastr.showToastr('Something went wrong. Please try again later', 'Error', 'error', '');
   
        }
      })
  }
 
  initializeColumns(): void {
   
    this.viewStudentsTableColumns = [
      {
        columnDef: 'select',
        header: '',
        isSortable: false,
        isCheckBox: true,
        cell: (element: Record<string, any>) => ``
      },
      {
        columnDef: 'firstName',
        header: 'Applicant Name',
        isSortable: true,
        isLink: false,
        cell: (element: Record<string, any>) => `${element['firstName']} ${element['surname']}`
      },
      {
        columnDef: 'enrollmentNumber',
        header: 'Enrollment Number',
        isSortable: false,
        isLink: false,
        cell: (element: Record<string, any>) => `${element['enrollmentNumber']}`
      },
      // {
      //   columnDef: 'marks',
      //   header: 'Marks',
      //   isSortable: false,
      //   isLink: false,
      //   cell: (element: Record<string, any>) => `${element['marks']}` !== 'undefined' ? `${element['marks']}` : '-'
      // },
      {
        columnDef: 'courseName',
        header: 'Course Name',
        isSortable: true,
        isLink: false,
        cell: (element: Record<string, any>) => `${element['courseName']}`
      },
      // {
      //   columnDef: 'numberOfExams',
      //   header: 'No of Exams',
      //   isSortable: true,
      //   cell: (element: Record<string, any>) => `${element['numberOfExams']}`
      // },
      {
        columnDef: 'session',
        header: 'Admission Year',
        isSortable: true,
        isLink: false,
        cell: (element: Record<string, any>) => `${element['session']}`
      },
      //  {
      //   columnDef: 'exams',
      //   header: 'Exam Name',
      //   isCheckBox: false,
      //   isDropdown: true,
      //   cell: (element: Record<string, any>) => ``
      // },
 
    ];
  }
 
  getSelectedCourse(event: any) {
    this.selectedCourse = event.value
   // this.loggedInUserRole === 'exams_secretary' ? this.getLongPendingStudentEnrollmentList(event.value,this.selectedAcademicYear) : this.getEnrollmentData();
   
  }
 
  getCoursesList() {
    this.baseService.getAllCourses$().subscribe({
      next: (res: any) => {
        this.isDataLoading = false;
        this.courses = res.responseData;
        console.log(this.courses[this.courses.length - 1]['id'])
        if (this.filtersNotSet) {
          this.courseFormControl.patchValue(this.courses[this.courses.length - 1]['id']);
     
        }
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message)
      }
    })
  }
 
  getSelectedAcademicYear(event: any) {
    this.selectedAcademicYear = event.value;
   // this.getEnrollmentData();
  }
 
  getAdmissionSessionList() {
    this.years = this.baseService.getAdmissionSessionList()
 
    if (this.filtersNotSet) {
      console.log( this.selectedAcademicYear)
      this.selectedAcademicYear = this.years[4];
      //this.yearFormControl.patchValue(this.years[4]);
      console.log( this.selectedAcademicYear)
     
    }
  }
 
 
  openRegistrationPopup() {
    const registrationPopupData = {
      examDetails: this.stateData,
      tableColumns: this.initializeRegistrationTableColumns(),
      StudentsToRegister: this.getStudentsToRegister(),
    }
 
    if (registrationPopupData.StudentsToRegister.length > 0) {
      const dialogRef = this.dialog.open(ConfirmStudentRegistrationComponent, {
        data: registrationPopupData,
        width: '900px',
        maxWidth: '90vw',
        maxHeight: '90vh'
      })
 
      dialogRef.afterClosed().subscribe((response: any) => {
        if(response) {
          if(response === true) {
          let request: any;
          const requestObjArray: any = [];
          this.finalRegistrationRequest.forEach((obj) => {
              request = {
              examIds: obj.examIds,
              studentId: obj.id,
              examCycleId: this.examCycleId,
              status: "REGISTERED",
              remarks: "Payment. "
            }
            requestObjArray.push(request);
          })
       
          this.baseService.registerStudentsToExams(requestObjArray).subscribe({
            next: (res) => {
              this.toastr.showToastr(res.statusInfo.statusMessage, 'Success', 'success', '');
              this.router.navigate(['/student-registration/institute']);
            },
            error: (err: HttpErrorResponse) => {
              console.log(err);
              this.toastr.showToastr('Error while registering student to exams', 'Error', 'error', '');
            }
          })
        }
      }
      })
    }
  }
 
  initializeRegistrationTableColumns() {
    const tableColumns = [
      {
        columnDef: 'name',
        header: 'Full name',
        isSortable: true,
        cell: (element: Record<string, any>) => `${element['name']}`,
        cellStyle: {
          'background-color': '#0000000a',
          'color': '#00000099'
        },
      },
      {
        columnDef: 'enrollmentNumber',
        header: 'Enrollment No',
        isSortable: true,
        cell: (element: Record<string, any>) => `${element['enrollmentNumber']}`,
        cellStyle: {
          'background-color': '#0000000a',
          'color': '#00000099'
        },
      },
      {
        columnDef: 'course',
        header: 'Course name',
        isSortable: true,
        cell: (element: Record<string, any>) => `${element['course']}`,
        cellStyle: {
          'background-color': '#0000000a',
          'color': '#00000099'
        },
      },
      {
        columnDef: 'admissionYr',
        header: 'Admission Year',
        isSortable: true,
        cell: (element: Record<string, any>) => `${element['admissionYr']}`,
        cellStyle: {
          'background-color': '#0000000a',
          'color': '#00000099'
        },
      },
      // {
      //   columnDef: 'noOfExam',
      //   header: 'No of Exam',
      //   isSortable: true,
      //   cell: (element: Record<string, any>) => `${element['noOfExam']}`,
      //   cellStyle: {
      //     'background-color': '#0000000a',
      //     'color': '#00000099'
      //   },
      // },
      // {
      //   columnDef: 'examNames',
      //   header: 'Exam Name',
      //   isSortable: true,
      //   cell: (element: Record<string, any>) => `${element['examNames']}`,
      //   cellStyle: {
      //     'background-color': '#0000000a',
      //     'color': '#00000099'
      //   },
      // },
    ]
    return tableColumns;
  }
 
  getStudentsToRegister() {
    this.finalRegistrationRequest = [];
    const StudentsToRegisterList: any[] = []
    let details: any = {};
    this.studentsToRegister.forEach((studentDetails: any) => {
    //   const examNames: any = [];
    // const examIds: any = [];
      details = {
        id: studentDetails.id,
        name: studentDetails.firstName + ' ' + studentDetails.surname,
        course: studentDetails.courseName,
        admissionYr: studentDetails.session,
        enrollmentNumber: studentDetails.enrollmentNumber,
        // noOfExam: studentDetails.examName.length,
      }
      // to map exam names
      // studentDetails.examName.map((obj: any) => {
      //  examNames.push(obj.name);
      //  examIds.push(obj.id);
      // })
      details['examNames'] = this.examName;
      details['examIds'] = [this.examId];
      StudentsToRegisterList.push(details);
      this.finalRegistrationRequest.push(details);
    })
    return StudentsToRegisterList
  }
}
 
 
