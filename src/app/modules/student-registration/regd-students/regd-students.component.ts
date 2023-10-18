import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegdStudentsTableData, TableColumn } from 'src/app/interfaces/interfaces';
import { BaseService } from 'src/app/service/base.service';

@Component({
  selector: 'app-regd-students',
  templateUrl: './regd-students.component.html',
  styleUrls: ['./regd-students.component.scss']
})
export class RegdStudentsComponent {
  examCycleId: string;
  breadcrumbItems = [
    { label: 'Register Students to Exam cycles and Exams', url: '' }
  ] 
  constructor(
    private router: Router, private baseService: BaseService, private route: ActivatedRoute){
      this.route.params.subscribe((param => {
        this.examCycleId = param['id'];
      }))
  }
 
  viewStudentsTableColumns: TableColumn[] = [];
  isDataLoading: boolean = false;
  regdStudents : RegdStudentsTableData[] = [];
  
  ngOnInit(): void {
    this.initializeColumns();
    if(this.examCycleId !== undefined) {
    this.getRegdStudents(this.examCycleId);
    }
  }

  getRegdStudents(examCycle: string){
    this.isDataLoading = true;
    this.baseService.getStudentRegistrationByExamCycle(this.examCycleId).subscribe({
      next: (res) => {
        console.log("res ==>", res);
        this.isDataLoading = false;
      }
    })
  }

  initializeColumns(): void {
    this.viewStudentsTableColumns = [
      {
        columnDef: 'name',
        header: 'Name',
        isSortable: true,
        cell: (element: Record<string, any>) => `${element['name']}`
      },
      {
        columnDef: 'rollNo',
        header: 'Roll no',
        isSortable: true,
        cell: (element: Record<string, any>) => `${element['rollNo']}`
      },
      {
        columnDef: 'course',
        header: 'Course',
        isSortable: true,
        cell: (element: Record<string, any>) => `${element['course']}`
      },
      {
        columnDef: 'admissionYr',
        header: 'Year Of Admission',
        isSortable: true,
        cell: (element: Record<string, any>) => `${element['admissionYr']}`
      },
      {
        columnDef: 'noOfExam',
        header: 'No of Exam',
        isSortable: true,
        cell: (element: Record<string, any>) => `${element['noOfExam']}`
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
