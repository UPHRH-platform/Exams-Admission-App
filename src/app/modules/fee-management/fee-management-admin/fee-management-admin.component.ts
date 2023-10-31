import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BaseService } from 'src/app/service/base.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TableColumn } from 'src/app/interfaces/interfaces';
import { mergeMap, of } from 'rxjs';


interface Course {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-fee-management-admin',
  templateUrl: './fee-management-admin.component.html',
  styleUrls: ['./fee-management-admin.component.scss']
})
export class FeeManagementAdminComponent implements OnInit {
    //#region (global variables)
  isDataLoading: boolean = false;
  instituteData: any[] =[];
  studentData:any[] = [];
  searcControl = '';
  searchKey = '';
  showInstitutesTable = true;
  instituteTableHeader: TableColumn[] = [];
  studentExamsTableHeader: TableColumn[] = [];
  courses: Course[] = [
    {value: 'bsc', viewValue: 'BSc'},
    {value: 'msc', viewValue: 'MSc'},
  ];

  examCycleList = []


  breadcrumbItems = [
    { label: 'Fee Management', url: '' },
  ]
  
  //#endregion

  examCycleControl = new FormControl('',[Validators.required]);

  constructor(
    private baseService : BaseService
  ) {}

  examCycleFormControl = new FormControl();

  ngOnInit(): void {
    this.intialisation()
    this.getExamCycles();
  }

  intialisation() {
    // this.getExamCycles()
    // this.getInstitutesData()
    this.initializeColumns();
    this.initializeStudentColumns();
    // this.studentExamsTableData();
  }

  initializeColumns():void{
    this.instituteTableHeader = [];
   this.instituteTableHeader = [
    {
      header: 'Institute name',
      columnDef: 'instituteName',
      isSortable: true,
      cell: (element: Record<string, any>) => `${element['instituteName']}`,
      cellStyle: {
        'background-color': '#0000000a',
        'color': '#00000099'
      },
    },{
      header: 'Course name',
      columnDef: 'courseName',
      isSortable: true,
      cell: (element: Record<string, any>) => `${element['courseName']}`,
      cellStyle: {
        'background-color': '#0000000a', 'width': '160px', 'color': '#00000099'
      },
    },{
      header: 'Institute code',
      columnDef: 'instituteCode',
      isSortable: true,
      cell: (element: Record<string, any>) => `${element['instituteCode']}`,
      cellStyle: {
        'background-color': '#0000000a', 'width': '160px', 'color': '#00000099'
      },
    },{
      header: 'Students register',
      columnDef: 'registerStudentsCount',
      isSortable: true,
      cell: (element: Record<string, any>) => `${element['registerStudentsCount']}`,
      cellStyle: {
        'background-color': '#0000000a', 'width': '160px', 'color': '#00000099'
      },
    },{
      header: 'Students paid',
      columnDef: 'paidStudentsCount',
      isSortable: true,
      cell: (element: Record<string, any>) => `${element['paidStudentsCount']}`,
      cellStyle: {
        'background-color': '#0000000a', 'width': '145px', 'color': '#00000099'
      },
    },{
      header: 'Total fee paid',
      columnDef: 'totalFeePaid',
      isSortable: true,
      cell: (element: Record<string, any>) => `${element['totalFeePaid']}`,
      cellStyle: {
        'background-color': '#0000000a', 'width': '145px', 'color': '#00000099'
      },
    },{
      header: '',
      columnDef: 'viewList',
      cell: (element: Record<string, any>) => `View List`,
      cellStyle: {
        'background-color': '#0000000a', 'width': '160px', 'color': '#00000099'
      },
      isAction: true,
      showDeleteIcon: false,
    },
    ]
}
  instituteTableData(examCycleId: number) {
    this.isDataLoading = true;
    this.baseService.getFeeTableData$(examCycleId)
    .pipe((mergeMap((response: any) => {
      return this.formateInstituteTableData(response.responseData)
    })))
    .subscribe({
      next:(res:any)=>{
       console.log(res.formatedInstituteTableDataList)
       this.instituteData = res.formatedInstituteTableDataList
       this.isDataLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        this.isDataLoading = false;
        console.log(error)
      }

    })

  }

  formateInstituteTableData(response: any) {
    const formatedInstituteTableData:any = {
      formatedInstituteTableDataList: []
    } 
  /*   = {
      formatedInstituteTableDataList: []examCycle
: 
    } */

    if (response) {
      console.log(response.examFees)
let r = response.examFees
      r.forEach((instituteData: any) => {
        console.log(instituteData)
        const formatedInstitutesData = {
          instituteId:instituteData.institute.id,
          examCycleId:instituteData.examCycle.id,
          instituteName: instituteData.institute.instituteName,
          courseName: instituteData.examCycle.course.courseName,
          instituteCode: instituteData.institute.instituteCode,
          registerStudentsCount: instituteData.totalStudentsCount,
          paidStudentsCount: instituteData.totalPaidCount,
          totalFeePaid: instituteData.totalPaidAmount,
          viewList: instituteData.viewList,
          classes: {
            viewList: ['cursor-pointer', 'color-blue']
          }
        }

        formatedInstituteTableData.formatedInstituteTableDataList.push(formatedInstitutesData)
      })
    }

    return of(formatedInstituteTableData);
  }

 initializeStudentColumns():void{
  this.studentExamsTableHeader = [];
  this.studentExamsTableHeader = [
    {
      header: 'Full name',
      columnDef: 'studentName',
      isSortable: true,
      cell: (element: Record<string, any>) => `${element['studentName']}`,
      cellStyle: {
        'background-color': '#0000000a',
        'color': '#00000099'
      },
    },{
      header: 'Enrolement Number',
      columnDef: 'enrolementNumber',
      cell: (element: Record<string, any>) => `${element['enrolementNumber']}`,
      cellStyle: {
        'background-color': '#0000000a', 'width': '100px', 'color': '#00000099'
      },
    },{
      header: 'Course name',
      columnDef: 'courseName',
      cell: (element: Record<string, any>) => `${element['courseName']}`,
      cellStyle: {
        'background-color': '#0000000a', 'width': '100px', 'color': '#00000099'
      },
    },{
      header: 'Exam',
      columnDef: 'exams',
      cell: (element: Record<string, any>) => `${element['exams']}`,
      cellStyle: {
        'background-color': '#0000000a', 'width': '100px', 'color': '#00000099'
      },
    },{
      header: 'No. of Exams',
      columnDef: 'numberOfExams',
      cell: (element: Record<string, any>) => `${element['numberOfExams']}`,
      cellStyle: {
        'background-color': '#0000000a', 'width': '100px', 'color': '#00000099'
      },
    },{
      header: 'Fee',
      columnDef: 'fee',
      cell: (element: Record<string, any>) => `${element['fee']}`,
      cellStyle: {
        'background-color': '#0000000a', 'width': '100px', 'color': '#00000099'
      },
    },{
      header: '',
      columnDef: 'status',
      cell: (element: Record<string, any>) => `${element['status']}`,
      cellStyle: {
        'background-color': '#0000000a', 'width': '100px', 'color': '#00000099'
      },
    },
  ]
 }

 getStudentFeesListForInstitute(examCycleId: number,instituteId:number, ){
    this.isDataLoading = true;
    this.baseService.getStudentFeesListForInstitute$(examCycleId,instituteId)
    .pipe(mergeMap((response: any)=> {
      console.log(response.responseData)
      return this.formateStudentData(response.responseData)
    }))
    .subscribe({
      next:(res:any)=>{
        console.log(res)
        this.studentData = res.studentsExamDetailsList;
     

      },
      error: (error: HttpErrorResponse) => {
        this.isDataLoading = false;
        console.log(error)
      }

    })

  } 

  formateStudentData(response: any) {
    const studentsExamDetails: {
      studentsExamDetailsList: any[]
    } = {
      studentsExamDetailsList: []
    }
    if (response) {
      response.forEach((examDetails: any) => {
        console.log(examDetails.student)
        const studentExamDetial = {
          studentName: examDetails.student.firstName +" "+ examDetails.student.surname,
          enrolementNumber: examDetails.student.enrollmentNumber || "-",
          courseName: examDetails.student.course.courseName,
          exams: examDetails.student.intermediateSubjects,
          numberOfExams: examDetails.student.intermediateSubjects,
          fee: examDetails.amount,
          status: examDetails.status,
          classes: {
            status: ['color-green']
          },
        }

        studentsExamDetails.studentsExamDetailsList.push(studentExamDetial)
      })
    }

    return of(studentsExamDetails);

  }
  
  getSelectedExamcycleId(e: any) {
    this.getFeeDetailsByExamCycle(e)
  }
  getFeeDetailsByExamCycle(e: any) {
    console.log(e)
    this.instituteTableData(e);
  }

  getExamCycles() {
    this.baseService.getExamCycleList$()
      .subscribe({
        next: (res: any) => {
          this.examCycleList = res.responseData;
          const lastIndexSelected: any = this.examCycleList[this.examCycleList.length - 1];
          this.examCycleFormControl.setValue(lastIndexSelected.id)
          this.getFeeDetailsByExamCycle(lastIndexSelected.id)
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        }
      })
  }

  getInstitutesData(searchKey: string = '') {
    // this.feeManagementService.getInstitutesData(searchKey)
    // .subscribe((InstitutesData: any) => {
    //   this.instituteTableData = InstitutesData
    // })
  }

  getExamsOfInstitute(instituteId: string) {
    // .subscribe((examsFeeDetails: any) => {
    //   this.studentExamsTableData = examsFeeDetails
    // })
  }

  search() {
    this.searchKey = this.searcControl
    this.showInstitutesTable = true
  }

  onSelectedInstitute(event: any) {
  
    this.getStudentFeesListForInstitute(event.row.examCycleId,event.row.instituteId)
    this.showInstitutesTable = false

  }


}
