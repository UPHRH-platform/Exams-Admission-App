import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthServiceService } from 'src/app/core/services';
import { Course, RegdStudentsTableData, TableColumn } from 'src/app/interfaces/interfaces';
import { BaseService } from 'src/app/service/base.service';
import { Location } from '@angular/common';
import { FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrServiceService } from 'src/app/shared/services/toastr/toastr.service';
@Component({
  selector: 'app-regd-students',
  templateUrl: './regd-students.component.html',
  styleUrls: ['./regd-students.component.scss']
})
export class RegdStudentsComponent {
  examCycleId: string;
  instituteId: string;
  registeredStudents: any=[];
  breadcrumbItems = [
    { label: 'Register Students to Exam cycles and Exams', url: '' }
  ] 
  examName: string;
  examCycle: string;
  examCycleList:any[] = [];
  examCycleControl = new FormControl()
  courseFormControl= new FormControl()
  courses: Course[]=[]
  years: string[] = [];

  constructor(
    private baseService: BaseService, private route: ActivatedRoute, 
    private authService: AuthServiceService,
    private location: Location,
    private toasterService: ToastrServiceService
    ){
      this.route.params.subscribe((param => {
        this.examCycleId = param['id'];
        this.examName = param['examName']
      }))
  }
 
  viewStudentsTableColumns: TableColumn[] = [];
  isDataLoading: boolean = false;
  regdStudents : RegdStudentsTableData[] = [];
  selectedAcademicYear: any;
  filtersNotSet = true;
  
  ngOnInit(): void {
    this.examCycleControl = new FormControl('', [Validators.required]);
    this.getExamCycleData();
    this.getCourseList()
    this.getFilters();
    this.initializeColumns();
    this.getInstituteDetailByUserId();
    this.getAdmissionSessionList();
  }

  getAdmissionSessionList() {
    this.years = this.baseService.getAdmissionSessionList()
    if (this.filtersNotSet) {
      this.selectedAcademicYear = this.years[4];
    }
  }


  getCourseList(){
    this.baseService.getAllCourses$().subscribe({
      next: (res: any) => {
        console.log( res.responseData)
        this.courses = res.responseData;

        const lastIndexSelected: any = this.courses[this.courses.length - 1];
        this.courseFormControl.setValue(lastIndexSelected.id)
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message)
      }
    })
  }

  getSelectedAcademicYear(event: any) {
    this.selectedAcademicYear = event.value;
  }

  getFilters() {
    const filters = this.baseService.getFilter;
    if (filters && filters.registerSudent) {
      this.examCycleControl.setValue(filters.registerSudent.examCycle);
    }
  }

  onExamCycleChange(e : any){

  }

  onCourseChange(e : any){

  }

  getExamCycleData() {
    // this.isDataLoading = true;
    this.baseService.getExamCycleList$().subscribe({
    next: (res) => {
      // this.isDataLoading = false;
      this.examCycleList = res.responseData;
      if (!this.examCycleControl.value) {
        this.examCycleControl.setValue(this.examCycleList[this.examCycleList.length-1].id)
      }
      this.examCycle= this.examCycleControl.value;
      // this.getQuestionPapersByExamCycle()
 
    },
    error: (error: HttpErrorResponse) => {
      console.log(error);
      this.examCycleList = [];
      this.toasterService.showToastr('Something went wrong. Please try later.', 'Error', 'error', '');
    }
  })
  }

  
  getInstituteDetailByUserId() {
    const loggedInUserId = this.authService.getUserRepresentation().id;
    this.baseService.getInstituteDetailsByUser(loggedInUserId).subscribe({
      next: (res) => {
        if(this.examCycleId !== undefined) {
        this.getRegdStudents(res.responseData[0].id);
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getRegdStudents(instituteId: string | number){
    this.isDataLoading = true;
    this.baseService.getStudentRegistrationByExamCycleAndInstId(this.examCycleId, instituteId).subscribe({
      next: (res) => {
        this.isDataLoading = false;
        this.regdStudents = res.responseData;
        if(res.responseData.length > 0) {
          this.regdStudents = res.responseData.filter(
            (obj: any) => 
            {
              if(obj.exams[0].name.toString() == this.examName.toString()){
                const courseNames: any = [];
                obj.exams.forEach((exam: any) => {
                  console.log(exam)
                 courseNames.push(exam.name);
                })
                obj.examName = courseNames.join();
                return obj;
              }
          }
            );
        
            console.log(this.regdStudents)
        }
      },
      error: (err) => {
        console.log(err);
        this.isDataLoading = false;
      }
    })
  }

  initializeColumns(): void {
    this.viewStudentsTableColumns = [
      {
        columnDef: 'firstName',
        header: 'Name',
        isSortable: true,
        cell: (element: Record<string, any>) => `${element['firstName']}`
      },
      {
        columnDef: 'enrollmentNumber',
        header: 'Roll No',
        isSortable: true,
        cell: (element: Record<string, any>) => `${element['enrollmentNumber']}`
      },
      {
        columnDef: 'courseName',
        header: 'Course',
        isSortable: true,
        cell: (element: Record<string, any>) => `${element['courseName']}`
      },
      {
        columnDef: 'session',
        header: 'Year Of Admission',
        isSortable: true,
        cell: (element: Record<string, any>) => `${element['session']}`
      },
      // {
      //   columnDef: 'numberOfExams',
      //   header: 'No of Exam',
      //   isSortable: true,
      //   cell: (element: Record<string, any>) => `${element['numberOfExams']}`
      // },
      {
        columnDef: 'examName',
        header: 'Exam Name',
        isSortable: true,
        cell: (element: Record<string, any>) =>`${element['examName']}`
      }

    ];
  }

  cancel(){
    this.location.back()
  }
}
