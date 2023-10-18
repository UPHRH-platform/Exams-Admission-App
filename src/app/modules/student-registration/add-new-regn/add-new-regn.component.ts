import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ActivatedRoute, Router } from '@angular/router';
import { RegdStudentsTableData, TableColumn } from 'src/app/interfaces/interfaces';
import { ConfirmStudentRegistrationComponent } from '../dialogs/confirm-student-registration/confirm-student-registration.component';
import { AuthServiceService } from 'src/app/core/services';
import { BaseService } from 'src/app/service/base.service';
import { ToastrServiceService } from 'src/app/shared/services/toastr/toastr.service';

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
  enrollmentData: any[] = [];
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthServiceService,
    private baseService: BaseService,
    private toastr: ToastrServiceService
    ){
      this.stateData = this.router?.getCurrentNavigation()?.extras.state;
      if (!this.stateData) {
        this.router.navigateByUrl('/student-registration/institute')
      }
  }
 
  viewStudentsTableColumns: TableColumn[] = [];
  isDataLoading: boolean = false;
  regdStudents : RegdStudentsTableData[] = [];
  
  examList =  ["Exam1", "Exam2","Exam3", "Exam4","Exam5", "Exam6"];
  ngOnInit(): void {
    this.loggedInUserId = this.authService.getUserRepresentation().id;
    this.initializeColumns();
    this.getInstituteDetails();
    // this.getRegdStudents(this.stateData?.examId, this.stateData?.examCycle);
  }
  // get institute detail
  getInstituteDetails() {
    this.baseService.getInstituteDetailsByUser(this.loggedInUserId).subscribe({
      next: (res) => {
        const instituteId = res.responseData[0].id;
        this.getEnrollmentData(instituteId);
      }
    })
  }
  // get enrollment based on institute
  getEnrollmentData(instituteId?: string, courseId?: string, academicYear?: string) {
    let request = {
      instituteId: instituteId !== undefined? instituteId : '',
      courseId: courseId !== undefined? courseId : '',
      academicYear: academicYear !== undefined? academicYear: '',
      verificationStatus: ''
    }
    this.isDataLoading = true;
    this.baseService.getEnrollmentList(request).subscribe({
      next: (res) => {
        this.isDataLoading = false;
        res.responseData.map((obj: any) => {
          obj.courseName = obj.course.courseName;
        })
        console.log("RES ===>", res);
        this.enrollmentData = res.responseData;
      },
      error: (error: any) => {
        this.isDataLoading = false;
        this.toastr.showToastr(error.error.error.message, 'Error', 'error', '');
      }
    })
    }

  onSelectedRows(value: any) {
    this.studentsToRegister = value
  }

  getRegdStudents(examId: number, examCycle: string){
    this.isDataLoading = false;
    this.regdStudents = [
      {
        id: 0,
        name: "Vidhu",
        rollNo: "1234",
        course:"BSC GNM",
        admissionYr:"2020",
        noOfExam:"3",
        examName: []
      },
      {
        id: 1,
        name: "Vidhu",
        rollNo: "1234",
        course:"BSC GNM",
        admissionYr:"2020",
        noOfExam:"3",
        examName: []

      },
      {
        id: 2,
        name: "Adhi",
        rollNo: "12345",
        course:"BSC GNM",
        admissionYr:"2020",
        noOfExam:"3",
        examName: []
      },
      {
        id: 3,
        name: "Vidhu",
        rollNo: "1234",
        course:"BSC GNM",
        admissionYr:"2020",
        noOfExam:"3",
        examName: []
      }
    ]
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
      //   columnDef: 'name',
      //   header: 'Name',
      //   isSortable: true,
      //   cell: (element: Record<string, any>) => `${element['name']}`
      // },
      // {
      //   columnDef: 'rollNo',
      //   header: 'Roll no',
      //   isSortable: true,
      //   cell: (element: Record<string, any>) => `${element['rollNo']}`
      // },
      // {
      //   columnDef: 'course',
      //   header: 'Course',
      //   isSortable: true,
      //   cell: (element: Record<string, any>) => `${element['course']}`
      // },
      // {
      //   columnDef: 'admissionYr',
      //   header: 'Year Of Admission',
      //   isSortable: true,
      //   cell: (element: Record<string, any>) => `${element['admissionYr']}`
      // },
      // {
      //   columnDef: 'noOfExam',
      //   header: 'No of Exam',
      //   isSortable: true,
      //   cell: (element: Record<string, any>) => `${element['noOfExam']}`
      // },
      // {
      //   columnDef: 'examName',
      //   header: 'Exam Name',
      //   isCheckBox: false,
      //   isDropdown: true,
      //   cell: (element: Record<string, any>) => ``
      // }, 

    ];
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
        if(response) {}
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
        columnDef: 'rollNo',
        header: 'Roll no',
        isSortable: true,
        cell: (element: Record<string, any>) => `${element['rollNo']}`,
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
      {
        columnDef: 'noOfExam',
        header: 'No of Exam',
        isSortable: true,
        cell: (element: Record<string, any>) => `${element['noOfExam']}`,
        cellStyle: {
          'background-color': '#0000000a',
          'color': '#00000099'
        },
      },
      {
        columnDef: 'examNames',
        header: 'Exam Name',
        isSortable: true,
        cell: (element: Record<string, any>) => `${element['examNames']}`,
        cellStyle: {
          'background-color': '#0000000a',
          'color': '#00000099'
        },
      },
    ]
    return tableColumns;
  }

  getStudentsToRegister() {
    const StudentsToRegisterList: { id: any; name: any; rollNo: any; course: any; admissionYr: any; noOfExam: any; examNames: any; }[] = []
    this.studentsToRegister.forEach((studentDetails: any) => {
      const details = {
        id: studentDetails.id,
        name: studentDetails.name,
        rollNo: studentDetails.rollNo,
        course: studentDetails.course,
        admissionYr: studentDetails.admissionYr,
        noOfExam: studentDetails.noOfExam,
        examNames: studentDetails.examName.join(", "),
      }
      StudentsToRegisterList.push(details)
    })
    return StudentsToRegisterList
  }
}

