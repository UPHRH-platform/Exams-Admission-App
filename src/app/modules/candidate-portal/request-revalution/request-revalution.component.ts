import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CandidatePortalService } from '../services/candidate-portal.service';
import { mergeMap, of } from 'rxjs';
import { BaseService } from 'src/app/service/base.service';

@Component({
  selector: 'app-request-revalution',
  templateUrl: './request-revalution.component.html',
  styleUrls: ['./request-revalution.component.scss']
})
export class RequestRevalutionComponent implements OnInit {

  //#region (global variables)
  hallTicketDetails = {
    exmaCycleName: 'Exam Cycle 1',
    studentDetails: {
      firstName: 'Rajash',
      lastName: 'Kumaravel',
      roolNumber: '12345 89078',
      DOB: '24-01-1998',
    },
    hallTicketDetqails: {
      courseName: 'M. Sc. Nursing',
      courseYear: '2022 - 2023'
    }
  }

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
      cell: (element: Record<string, any>) => `${element['status']}`,
      cellStyle: {
        'background-color': '#0000000a', 'width': '135px', 'color': '#00000099'
      }
    },
  ]

  examTableData = []

  isHallTicket = true

  disableExamSelect = false;
  examsSelected = 0;
  amountToPay = 0;
  costOfExam = 3000;
  paymentDone = false;
  //#endregion

  constructor(
    private router: Router,
    private candidatePortalService: CandidatePortalService,
    private baseService: BaseService,
  ) { }

  ngOnInit(): void {
    this.intialisation()
  }

  //#region (intialisation)
  intialisation() {
    this.getExamResults()
  }

  getExamResults() {
    this.baseService.getResults()
      .pipe(mergeMap((res: any) => {
        return this.formateResultDetails(res)
      })).subscribe((results: any) => {
        this.examTableData = results.examResults
      })
  }

  formateResultDetails(results: any) {
    const exams: {
      examResults: {
        examName: string,
        internalMarks: string,
        externalMarks: string,
        totalMarks: string,
        status: string,
        classes: any,
      }[]
    } = {
      examResults: []
    }

    if (results) {
      results.forEach((result: any) => {
        const classes:string[] = [result.status === 'Fail' ? 'color-red' : 'color-green']
        const examResult = {
          examName: result.examName,
          internalMarks: result.internalMarks,
          externalMarks: result.externalMarks,
          totalMarks: result.totalMarks,
          status: result.status,
          classes: {
            status: classes
          }
        }
        exams.examResults.push(examResult)
      })
    }

    return of(exams);
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

  onSelectedRows(event: any[]) {
    this.examsSelected = event.length
    this.amountToPay = (this.examsSelected * this.costOfExam)
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

}
