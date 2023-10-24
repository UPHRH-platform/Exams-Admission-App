import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from 'src/app/core/services';
import { RegdStudentsTableData, TableColumn } from 'src/app/interfaces/interfaces';
import { BaseService } from 'src/app/service/base.service';

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
  constructor(
    private router: Router, private baseService: BaseService, private route: ActivatedRoute, private authService: AuthServiceService){
      this.route.params.subscribe((param => {
        this.examCycleId = param['id'];
      }))
  }
 
  viewStudentsTableColumns: TableColumn[] = [];
  isDataLoading: boolean = false;
  regdStudents : RegdStudentsTableData[] = [];
  
  ngOnInit(): void {
    this.initializeColumns();
    this.getInstituteDetailByUserId();
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
        if(this.regdStudents.length > 0) {
          this.regdStudents.map((obj: any) => {
            const courseNames: any = [];
           obj.exams.forEach((exam: any) => {
            courseNames.push(exam.name);
           })
           obj.examName = courseNames.join();
          })
        }
        console.log(this.regdStudents);
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
      {
        columnDef: 'numberOfExams',
        header: 'No of Exam',
        isSortable: true,
        cell: (element: Record<string, any>) => `${element['numberOfExams']}`
      },
      {
        columnDef: 'examName',
        header: 'Exam Name',
        isSortable: true,
        cell: (element: Record<string, any>) =>`${element['examName']}`
      }

    ];
  }
}
