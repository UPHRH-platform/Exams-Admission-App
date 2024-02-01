import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LoadingDialogComponent } from '../loading-dialog/loading-dialog.component';
import { BaseService } from 'src/app/service/base.service';
import { Tabs } from 'src/app/shared';
import { mergeMap, of } from 'rxjs';
import { AuthServiceService } from 'src/app/core/services';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrServiceService } from 'src/app/shared/services/toastr/toastr.service';


interface Course {
  value: string;
  viewValue: string;
}
interface Year {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-fee-management-list-institute',
  templateUrl: './fee-management-list-institute.component.html',
  styleUrls: ['./fee-management-list-institute.component.scss']
})
export class FeeManagementListInstituteComponent implements OnInit {

  // tabs: any[] = [];
  // currentTabIndex: number;

  courses: Course[] = [
    { value: 'bsc', viewValue: 'BSc' },
    { value: 'msc', viewValue: 'MSc' },
  ];
  years: Year[] = [
    { value: 'sem-1', viewValue: '2020' },
    { value: 'sem-2', viewValue: '2021' },
    { value: 'sem-3', viewValue: '2022' },
  ];

  isHallTicket = true;
  removeTbodyColor = true;
  // tableColumns: any = []
  pendingFeeTableHeader = [
    {
      header: '',
      columnDef: 'select',
      isSortable: false,
      isCheckBox: true,
      cell: (element: Record<string, any>) => ``,
      cellStyle: {
        'background-color': '#0000000a', 'width': '30px', 'color': '#00000099'
      },
    }, {
      header: 'Full name',
      columnDef: 'studentName',
      isSortable: true,
      cell: (element: Record<string, any>) => `${element['studentName']}`,
      cellStyle: {
        'background-color': '#0000000a',
        'color': '#00000099'
      },
    }, {
      header: 'Exam',
      columnDef: 'examNames',
      cell: (element: Record<string, any>) => `${element['examNames']}`,
      cellStyle: {
        'background-color': '#0000000a', 'width': '300px', 'color': '#00000099'
      },
    }, {
      header: 'No. of Exams',
      columnDef: 'noOfExams',
      cell: (element: Record<string, any>) => `${element['noOfExams']}`,
      cellStyle: {
        'background-color': '#0000000a', 'width': '135px', 'color': '#00000099'
      },
    }, {
      header: 'Fee',
      columnDef: 'fee',
      cell: (element: Record<string, any>) => `₹ ${element['fee']}`,
      cellStyle: {
        'background-color': '#0000000a', 'width': '100px', 'color': '#00000099'
      },
    }, {
      header: '',
      columnDef: 'status',
      cell: (element: Record<string, any>) => `${element['status']}`,
      cellStyle: {
        'background-color': '#0000000a', 'width': '130px', 'color': '#00000099'
      },
    }
  ]

  pendingFeeTableData = []

  paidFeeTableHeader = [
    {
      header: 'Full name',
      columnDef: 'studentName',
      cell: (element: Record<string, any>) => `${element['studentName']}`,
      cellStyle: {
        'background-color': '#0000000a',
        'color': '#00000099'
      }
    }, {
      header: 'Exam',
      columnDef: 'examNames',
      cell: (element: Record<string, any>) => `${element['examNames']}`,
      cellStyle: {
        'background-color': '#0000000a', 'width': '300px', 'color': '#00000099'
      }
    }, {
      header: 'No. of Exams',
      columnDef: 'noOfExams',
      cell: (element: Record<string, any>) => `${element['noOfExams']}`,
      cellStyle: {
        'background-color': '#0000000a', 'width': '135px', 'color': '#00000099'
      }
    }, {
      header: 'Fee',
      columnDef: 'fee',
      cell: (element: Record<string, any>) => ` ₹ ${element['fee']}`,
      cellStyle: {
        'background-color': '#0000000a', 'width': '100px', 'color': '#00000099'
      }
    }, {
      header: '',
      columnDef: 'status',
      cell: (element: Record<string, any>) => `${element['status']}`,
      cellStyle: {
        'background-color': '#0000000a', 'width': '130px', 'color': '#00000099'
      }
    },
  ]

  paidFeeTableData = [
  ]

  filterForm: FormGroup
  tabHeader = 'Pending'

  payingExams: any = []
  breadcrumbItems = [
    { label: 'Fee Management', url: '' },
  ]
  examCycleId: string;
  isDataLoading: boolean;
  loggedInUserId: any;
  instituteId: any;
  examName: string;
  examCycle: string;
  examCycleList:any[] = [];
  examCycleControl = new FormControl()
  courseFormControl= new FormControl()
  constructor(
    private dialog: MatDialog,
    private baseService: BaseService,
    private authService: AuthServiceService,
    private route: ActivatedRoute,
    private toasterService: ToastrServiceService
  ) {
    this.filterForm = new FormGroup({
      search: new FormControl(''),
      selectedStudent: new FormControl(),
      amount: new FormControl(''),
    })
  }

  ngOnInit() {
    this.examCycleControl = new FormControl('', [Validators.required]);
    this.getExamCycleData();
    this.getCourseList()
    this.intialisation();
  }

  //#region (intialisation)
  intialisation() {
    // this.initializeTabs()
    // this.initializeTableColumns()

    this.examCycleId = this?.route?.snapshot?.paramMap?.get('id') || '0';
    this.getInstituteDetailsByUser()
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

  onExamCycleChange(e : any){

  }

  getInstituteDetailsByUser() {
    this.loggedInUserId = this.authService.getUserRepresentation().id;
    this.baseService.getInstituteDetailsByUser(this.loggedInUserId).subscribe({
      next: (res) => {
        if (this.examCycleId !== undefined) {
          this.getRegdStudents(res.responseData[0].id);
          this.instituteId = res.responseData[0].id;
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getRegdStudents(instituteId: any) {
    this.isDataLoading = true;
    this.baseService.getStudentRegistrationByExamCycleAndInstId(this.examCycleId, instituteId)
      .pipe((mergeMap((response: any) => {
        this.isDataLoading = false;
        return this.formateStudentFeeDetails(response.responseData);
      })))
      .subscribe((feeDetails: any) => {
        this.paidFeeTableData = feeDetails.paidFeeDetails
        this.pendingFeeTableData = feeDetails.pendingFeeDetails
      })

  }

  formateStudentFeeDetails(response: any) {
    let studentsFeeDetails: any = {
      paidFeeDetails: [],
      pendingFeeDetails: []
    };
    let foramtedFeeDetails: any
    if (response) {
      response.forEach((feeDetails: any) => {
        let examsNameArray = [];
        let examsIdArray = []
        let TotalFee = 0
        let feePaidStatus: boolean = false;
        for (let exam of feeDetails.exams) {
          examsNameArray.push(exam.name)
          examsIdArray.push(exam.id)
          TotalFee = TotalFee + exam.amount
          feePaidStatus = exam.feesPaid
        }
        foramtedFeeDetails = {
          studentName: feeDetails.firstName + " " + feeDetails.surname,
          examNames: examsNameArray,
          examsId: examsIdArray,
          noOfExams: examsNameArray.length,
          fee: TotalFee,
          studentId: feeDetails.id,

          status: feePaidStatus ? "Paid" : "Pending",
        }
        switch (feePaidStatus) {
          case true: {
            foramtedFeeDetails['classes'] = {
              status: ['color-green'],
            }
            studentsFeeDetails.paidFeeDetails.push(foramtedFeeDetails)
            break;
          }
          case false: {
            foramtedFeeDetails['classes'] = {
              status: ['color-blue'],
            }
            studentsFeeDetails.pendingFeeDetails.push(foramtedFeeDetails)
            break;
          }
        }
      })

    }
    return of(studentsFeeDetails)
  }

  getExamFeeDetails() {
    // this.baseService.getExamFeeDetails('')
    // .subscribe((result: any) => {
    //   this.pendingFeeTableData = result.filter((exam: any) => {})
    //   this.paidFeeTableData = result.filter((exam: any) => {})
    // })
  }

  selectTab(event: any) {
    this.tabHeader = event.tab.textLabel
    // this.initializeTableColumns()
  }

  payFee() {
    let examDetails: any = []

    if (this.payingExams) {

      for (let item of this.payingExams) {
        let examArrayObject = []
        for (let examid of item.examsId) {
          examArrayObject.push({
            id: examid,
            fee: item.fee
          })
        }

        examDetails.push({
          studentId: item.studentId,
          exam: examArrayObject

        })
      }
    }
    const reqBody: any = {
      "examCycleId": this.examCycleId,
      "instituteId": this.instituteId,
      "studentExam": examDetails,
      "amount": this.filterForm.value.amount,
      "payerType": "EXAM",
      "createdBy": this.loggedInUserId
    }

    this.baseService.payFees(reqBody)
      .subscribe((result: any) => {
        window.open(result.responseData.redirectUrl, "_blank");
        //  window.location.href=result.responseData.redirectUrl;
      })


  }

  onSelectedRows(event: any) {
    this.payingExams = event;
    this.calculateAmount();
  }

  calculateAmount() {
    let amount = 0;
    let numberOfStudents = 0;
    this.payingExams.forEach((exam: any) => {
      amount = amount + Number(exam.fee);
      numberOfStudents = numberOfStudents + 1
    });
    if (this.filterForm) {
      this.filterForm.get('amount')?.setValue(amount)
      this.filterForm.get('selectedStudent')?.setValue(numberOfStudents)
    }

  }
}
