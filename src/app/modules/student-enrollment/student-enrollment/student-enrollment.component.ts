import {Component} from '@angular/core';
import {FormControl, FormGroup, FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {NgFor} from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/core/services';
import { Tabs } from 'src/app/shared/config';
import { TableColumn } from 'src/app/interfaces/interfaces';
import { HttpErrorResponse } from '@angular/common/http';
import { BaseService } from 'src/app/service/base.service';
import { MatTabChangeEvent } from '@angular/material/tabs';

interface Course {
  value: string;
  viewValue: string;
}
interface Year {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-student-enrollment',
  templateUrl: './student-enrollment.component.html',
  styleUrls: ['./student-enrollment.component.scss'],
})
export class StudentEnrollmentComponent {
  isDataLoading:boolean = false;
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
  years: Year[] = [
    {value: '2020-2021', viewValue: '2020-2021'},
    {value: '2021-2022', viewValue: '2021-2022'},
    {value: '2022-2023', viewValue: '2022-2023'},
    {value: '2023-2024', viewValue: '2023-2024'},
    {value: '2024-2025', viewValue: '2024-2025'},
  ];
  isHallTicket: boolean = true;
constructor(private router: Router, private authService: AuthServiceService, private baseService: BaseService){}
  ngOnInit() {
    this.loggedInUserRole = this.authService.getUserRoles()[0];
    this.isDataLoading = false;
    this.initializeTabs();
    this.initializeSearchForm();
    this.getAllInstitutes();
    // courses to be fetched based on institute
    this.getAllCourses();
  }

  initializeSearchForm() {
    this.searchForm =  new FormGroup({
      searchData:  new FormControl('')
    })
  }

  getAllCourses() {
    this.baseService.getAllCourses$().subscribe({
      next: (res) => {
        console.log(res.responseData);
        this.courses = res.responseData;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    })
  }

  getAllInstitutes() {
    this.baseService.getAllInstitutes().subscribe({
      next: (res) => {
        console.log("res");
        this.instituteList = res.responseData;
      }
    })
  }

  onClickItem(e: any) {
    const id = e?.id;
    this.router.navigate(['/student-enrollment/view-enrollment/'+id])
  }

  initializeTabs() {
    this.tabs = Tabs['student_enrollment'];
    this.selectedTab = this.tabs[0];
    this.initializeColumns();
    this.getEnrollmentData();
  }

  getEnrollmentData(instituteId?: string, courseId?: string, academicYear?: string) {
  const request = {
    instituteId: instituteId !== undefined? instituteId : '',
    courseId: courseId !== undefined? courseId : '',
    academicYear: academicYear !== undefined? academicYear: '',
    verificationStatus: this.selectedTab.name === 'Approved'? 'VERIFIED' : this.selectedTab.name.toUpperCase()
  }
  console.log(request);
  this.isDataLoading = true;
  this.baseService.getEnrollmentList(request).subscribe({
    next: (res) => {
      this.isDataLoading = false;
      res.responseData.map((obj: any) => {
        obj.courseName = obj.course.courseName;
      })
      this.enrollmentTableData = res.responseData;
    },
    error: (error: HttpErrorResponse) => {
      this.isDataLoading = false;
      console.log(error);
    }
  })
  }

  applySearch(searchterms:any){ 
     this.searchParams = searchterms;
  }

  initializeColumns(): void {
    this.enrollmentTableColumns = [];
    switch(this.loggedInUserRole) {
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
          cell: (element: Record<string, any>) => `${element['enrollmentDate']}`
        },
        {
          columnDef: 'isLink',
          header: '',
          isSortable: false,
          isLink: true,
          cell: (element: Record<string, any>) => `View Enrollment`
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
            cell: (element: Record<string, any>) => `${element['marks']}`
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
          {
            columnDef: 'isLink',
            header: '',
            isSortable: false,
            isLink: true,
            cell: (element: Record<string, any>) => `View Enrollment`,
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
    const selectedCourse = event.value;
    this.getEnrollmentData('', selectedCourse, '');
  }

  getSelectedAcademicYear(event: any) {
    const selectedAcademicYear = event.value;
    this.getEnrollmentData('','',selectedAcademicYear);
  }

  onTabChange(event: MatTabChangeEvent) {
    const selectedIndex = event.index;
    this.selectedTab = this.tabs[selectedIndex];
    this.getEnrollmentData();
  }
}
