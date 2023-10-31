import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CandidatePortalService } from '../services/candidate-portal.service';
import { mergeMap, of } from 'rxjs';
import { BaseService } from 'src/app/service/base.service';
import { ToastrServiceService } from 'src/app/shared/services/toastr/toastr.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-request-revalution',
  templateUrl: './request-revalution.component.html',
  styleUrls: ['./request-revalution.component.scss']
})
export class RequestRevalutionComponent implements OnInit {

  //#region (global variables)
  studentDetails: any

  examTableHeader = [
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
      header: 'Name of exam',
      columnDef: 'examName',
      cell: (element: Record<string, any>) => `${element['examName']}`,
      cellStyle: {
        'background-color': '#0000000a',
        'color': '#00000099'
      }
    }, {
      header: 'Internal mark',
      columnDef: 'internalMarks',
      cell: (element: Record<string, any>) => `${element['internalMarks']}`,
      cellStyle: {
        'background-color': '#0000000a', 'width': '135px', 'color': '#00000099'
      }
    }, {
      header: 'External mark',
      columnDef: 'externalMarks',
      cell: (element: Record<string, any>) => `${element['externalMarks']}`,
      cellStyle: {
        'background-color': '#0000000a', 'width': '135px', 'color': '#00000099'
      }
    }, {
      header: 'Total marks',
      columnDef: 'totalMarks',
      cell: (element: Record<string, any>) => `${element['totalMarks']}`,
      cellStyle: {
        'background-color': '#0000000a', 'width': '135px', 'color': '#00000099'
      }
    }, {
      header: 'Status',
      columnDef: 'status',
      cell: (element: Record<string, any>) => `${element['result']}`,
      cellStyle: {
        'background-color': '#0000000a', 'width': '135px', 'color': '#00000099'
      }
    },
  ]

  examTableData = []
  selectedExams = []

  isHallTicket = true

  disableExamSelect = false;
  examsSelected = 0;
  amountToPay = 0;
  costOfExam = 3000;
  paymentDone = false;
  stateData: any | undefined;
  //#endregion

  constructor(
    private router: Router,
    private candidatePortalService: CandidatePortalService,
    private baseService: BaseService,
    private toasterService: ToastrServiceService
  ) { 
    this.stateData = this.router?.getCurrentNavigation()?.extras.state
  }

  ngOnInit(): void {
    this.intialisation()
  }

  //#region (intialisation)
  intialisation() {
    if (this.stateData) {
      console.log('modify results', this.stateData)
      const studentDetails = this.stateData.studentDetails
      this.studentDetails = {
        firstName: studentDetails.firstName,
        lastName: studentDetails.lastName,
        studentEnrollmentNumber: studentDetails.studentEnrollmentNumber,
        dob: new Date(studentDetails.dob),
        courseName: studentDetails.courseName,
        courseYear: studentDetails.courseYear,
        examCyclename: studentDetails.examCyclename
      }
      this.examTableData = this.stateData.exams;
    } else {
      this.router.navigateByUrl('candidate-portal')
    }
  }

  //#endregion

  //#region (navigate to results view)
  redirectToViewResults() {
    this.router.navigateByUrl('/candidate-portal/view-results')
  }
  //#endregion

  //#region (Request revalution)
  requestRevalution() {
    const formatedData = this.formateRevaluationData()
    this.candidatePortalService.requestRevolution(formatedData)
    // .subscribe((response: any) => {
    //   if(response) {
    this.router.navigateByUrl('/candidate-portal')
    //   }
    // })
  }

  formateRevaluationData() { }
  //#endregion

  onSelectedRows(event: any) {
    this.examsSelected = event.length
    this.amountToPay = (this.examsSelected * this.costOfExam)
    this.selectedExams = event
  }

  payFee() {
    const postData = {
      endpoint: "https://eazypayuat.icicibank.com/EazyPG",
      returnUrl: "https://payment.uphrh.in/api/v1/user/payment",
      paymode: "9",
      secret: "",
      merchantId: "600547",
      mandatoryFields: {
        referenceNo: '', //generate random number (this.baseService.generate_uuidv4())
        submerchantId: "45",
        transactionAmount: this.amountToPay,
        invoiceId: "x1",
        invoiceDate: "x",
        invoiceTime: "x",
        merchantId: "x",
        payerType: "registration", //module you create
        payerId: 'instituteId',
        transactionId: "x",
        transactionDate: "x",
        transactionTime: "x",
        transactionStatus: "x",
        refundId: "x",
        refundDate: "x",
        refundTime: "x",
        refundStatus: "x",
      },
      optionalFields: "registration", //module you create
    };
    // this.candidatePortalService.getPaymentUrl(postData)
    // .subscribe((result: any) => {
    //   window.open(result.url, "_blank");
    // })

    // const dialogRef = this.dialog.open(LoadingDialogComponent, {
    //   data: {
    //     description: 'Please wait a while. you are redirecting to payment page'
    //   },
    //   width: '800px',
    //   height: '500px',
    //   maxWidth: '90vw',
    //   maxHeight: '90vh'
    // })
    this.paymentDone = true
  }

  requestRetotalling() {
    const formBody = {
      student: {
        enrollmentNumber: this.studentDetails.studentEnrollmentNumber
      },
      exams: [],
      remarks: "Requesting for retotalling of marks 1",
    }
    this.selectedExams.forEach((element: any) => {
      const exam = {
        id: element.id
      }
    })
    this.baseService.requestRetotalling(formBody)
    .subscribe({
      next: (res) => {
        this.toasterService.showToastr('Retotaling request submited successfully', 'Success', 'success')
        this.router.navigateByUrl('')
      },
      error: (err: HttpErrorResponse) => {
        this.toasterService.showToastr(err, 'Error', 'error')
      }
    })
  }

}
