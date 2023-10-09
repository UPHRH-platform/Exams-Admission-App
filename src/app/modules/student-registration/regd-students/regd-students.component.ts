import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegdStudentsTableData, TableColumn } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-regd-students',
  templateUrl: './regd-students.component.html',
  styleUrls: ['./regd-students.component.scss']
})
export class RegdStudentsComponent {
  stateData : any; 
  breadcrumbItems = [
    { label: 'Register Students to Exam cycles and Exams', url: '' }
  ] 
  constructor(
    private router: Router){
      this.stateData = this.router?.getCurrentNavigation()?.extras.state;
      console.log( this.stateData)
  }
 
  viewStudentsTableColumns: TableColumn[] = [];
  isDataLoading: boolean = false;
  regdStudents : RegdStudentsTableData[] = [];
  
  ngOnInit(): void {
  
    this.initializeColumns();
    this.getRegdStudents(this.stateData?.examId, this.stateData?.examCycle);
  }

  getRegdStudents(examId: number, examCycle: string){
    this.isDataLoading = false;
    this.regdStudents = [
      {
        name: "Vidhu",
        rollNo: "1234",
        course:"BSC GNM",
        admissionYr:"2020",
        noOfExam:"3",
        examName:["Exam1, Exam2"]

      },
      {
        name: "Vidhu",
        rollNo: "1234",
        course:"BSC GNM",
        admissionYr:"2020",
        noOfExam:"3",
        examName:["Exam1, Exam2"]

      },
      {
        name: "Adhi",
        rollNo: "12345",
        course:"BSC GNM",
        admissionYr:"2020",
        noOfExam:"3",
        examName:["Exam1, Exam2"]

      },
      {
        name: "Vidhu",
        rollNo: "1234",
        course:"BSC GNM",
        admissionYr:"2020",
        noOfExam:"3",
        examName:["Exam1, Exam2"]

      }
    ]

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
