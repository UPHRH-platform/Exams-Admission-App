import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LoadingDialogComponent } from '../loading-dialog/loading-dialog.component';
import { BaseService } from 'src/app/service/base.service';
import { Tabs } from 'src/app/shared';
import { mergeMap, of } from 'rxjs';

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
    {value: 'bsc', viewValue: 'BSc'},
    {value: 'msc', viewValue: 'MSc'},
  ];
  years: Year[] = [
    {value: 'sem-1', viewValue: '2020'},
    {value: 'sem-2', viewValue: '2021'},
    {value: 'sem-3', viewValue: '2022'},
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
    },{
      header: 'Exam',
      columnDef: 'examNames',
      cell: (element: Record<string, any>) => `${element['examNames']}`,
      cellStyle: {
        'background-color': '#0000000a', 'width': '300px', 'color': '#00000099'
      },
    },{
      header: 'No. of Exams',
      columnDef: 'noOfExams',
      cell: (element: Record<string, any>) => `${element['noOfExams']}`,
      cellStyle: {
        'background-color': '#0000000a', 'width': '135px', 'color': '#00000099'
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
        'background-color': '#0000000a', 'width': '130px', 'color': '#00000099'
      },
    }
  ]

  pendingFeeTableData= [
  ]

  paidFeeTableHeader = [
    {
      header: 'Full name',
      columnDef: 'studentName',
      cell: (element: Record<string, any>) => `${element['studentName']}`,
      cellStyle: {
        'background-color': '#0000000a',
        'color': '#00000099'
      }
    },{
      header: 'Exam',
      columnDef: 'examNames',
      cell: (element: Record<string, any>) => `${element['examNames']}`,
      cellStyle: {
        'background-color': '#0000000a', 'width': '300px', 'color': '#00000099'
      }
    },{
      header: 'No. of Exams',
      columnDef: 'noOfExams',
      cell: (element: Record<string, any>) => `${element['noOfExams']}`,
      cellStyle: {
        'background-color': '#0000000a', 'width': '135px', 'color': '#00000099'
      }
    },{
      header: 'Fee',
      columnDef: 'fee',
      cell: (element: Record<string, any>) => `${element['fee']}`,
      cellStyle: {
        'background-color': '#0000000a', 'width': '100px', 'color': '#00000099'
      }
    },{
      header: '',
      columnDef: 'status',
      cell: (element: Record<string, any>) => `${element['status']}`,
      cellStyle: {
        'background-color': '#0000000a', 'width': '130px', 'color': '#00000099'
      }
    },
  ]

  paidFeeTableData= [
  ]

  filterForm: FormGroup
  tabHeader = 'Pending'

  payingExams:any = []
  breadcrumbItems = [
    { label: 'Fee Management', url: '' },
  ]
  constructor(
    private dialog: MatDialog,
    private baseService: BaseService
  ) {
    this.filterForm = new FormGroup({
      search: new FormControl(''),
      selectedStudent: new FormControl(),
      amount: new FormControl(''),
    })
  }

  ngOnInit() {
    this.intialisation();
  }

  //#region (intialisation)
  intialisation() {
    // this.initializeTabs()
    // this.initializeTableColumns()
    this.getStudentsFeeDetails()
  }

  getStudentsFeeDetails() {
   /*  this.baseService.getStudentFeeTableData$()
    .pipe((mergeMap((response: any) => {
      return this.formateStudentFeeDetails(response);
    })))
    .subscribe((feeDetails: any) => {
      this.paidFeeTableData = feeDetails.paidFeeDetails
      this.pendingFeeTableData = feeDetails.pendingFeeDetails
    }) */
  }

  formateStudentFeeDetails(response: any) {
    const studentsFeeDetails: {
      // studentFeeDetails: any[],
      pendingFeeDetails: any[],
      paidFeeDetails: any[]
    } = {
      // studentFeeDetails: [],
      pendingFeeDetails: [],
      paidFeeDetails: []
    }

    if (response) {
      response.forEach((feeDetails: any) => {
        let foramtedFeeDetails: any = {
          studentName: feeDetails.studentName,
          examNames: feeDetails.exams,
          noOfExams: feeDetails.numberOfExams,
          fee: feeDetails.fee,
          status: feeDetails.status,
        }
        switch (feeDetails.status) {
          case 'Paid': {
            foramtedFeeDetails['classes'] = {
              status: ['color-green'],
            }
            studentsFeeDetails.paidFeeDetails.push(foramtedFeeDetails)
            break;
          }
          case 'Pending': {
            foramtedFeeDetails['classes'] = {
              status: ['color-blue'],
            }
            studentsFeeDetails.pendingFeeDetails.push(foramtedFeeDetails)
            break;
          }
          // studentsFeeDetails.studentFeeDetails.push(foramtedFeeDetails)
        }
      })
    }

    return of(studentsFeeDetails)
  }

  // initializeTabs() {
  //   this.tabs = Tabs['Fee_Management'];
  // }

  // initializeTableColumns() {
  //   this.tableColumns = []
  //   const tableColumns = [
  //     {
  //       header: 'Full name',
  //       columnDef: 'studentName',
  //       cell: (element: Record<string, any>) => `${element['studentName']}`,
  //       cellStyle: {
  //         'background-color': '#0000000a',
  //         'color': '#00000099'
  //       }
  //     },{
  //       header: 'Exam',
  //       columnDef: 'examNames',
  //       cell: (element: Record<string, any>) => `${element['examNames']}`,
  //       cellStyle: {
  //         'background-color': '#0000000a', 'width': '300px', 'color': '#00000099'
  //       }
  //     },{
  //       header: 'No. of Exams',
  //       columnDef: 'noOfExams',
  //       cell: (element: Record<string, any>) => `${element['noOfExams']}`,
  //       cellStyle: {
  //         'background-color': '#0000000a', 'width': '135px', 'color': '#00000099'
  //       }
  //     },{
  //       header: 'Fee',
  //       columnDef: 'fee',
  //       cell: (element: Record<string, any>) => `${element['fee']}`,
  //       cellStyle: {
  //         'background-color': '#0000000a', 'width': '100px', 'color': '#00000099'
  //       }
  //     },{
  //       header: '',
  //       columnDef: 'status',
  //       cell: (element: Record<string, any>) => `${element['status']}`,
  //       cellStyle: {
  //         'background-color': '#0000000a', 'width': '130px', 'color': '#00000099'
  //       }
  //     },
  //   ]

  //   switch (this.currentTabIndex) {
  //     case 0: {
  //       const selectOption = {
  //         header: '',
  //         columnDef: 'select',
  //         isSortable: false,
  //         isCheckBox: true,
  //         cell: (element: Record<string, any>) => ``,
  //         cellStyle: {
  //           'background-color': '#0000000a', 'width': '30px', 'color': '#00000099'
  //         },
  //       }
  //       tableColumns.unshift(selectOption);
  //       break;
  //     }
  //     case 1: {
  //       break;
  //     }
  //   }

  //   this.tableColumns = tableColumns
  // }


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
 
     this.baseService.payFees()
     .subscribe((result: any) => {
      console.log(result.responseData.redirectUrl)
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
