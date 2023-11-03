import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CandidatePortalService } from '../services/candidate-portal.service';
import { mergeMap, of } from 'rxjs';
import { BaseService } from 'src/app/service/base.service';
import { ToastrServiceService } from 'src/app/shared/services/toastr/toastr.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthServiceService } from 'src/app/core/services';

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

  examTableData: any = []
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
    private toasterService: ToastrServiceService,
    private authService: AuthServiceService
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
        dob: studentDetails.dob,
        courseName: studentDetails.courseName,
        courseYear: studentDetails.courseYear,
        examCyclename: studentDetails.examCyclename,
        examCycleId: studentDetails.examCycleId
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

  //#endregion

  onSelectedRows(event: any) {
    this.examsSelected = event.length
    this.amountToPay = (this.examsSelected * this.costOfExam)
    this.selectedExams = event
  }

  payFee() {
    const studentDetails = this.authService.getUserRepresentation();
    const formBody: {
      examCycleId: string,
      instituteId: number,
      studentExam: [{
        studentId: string,
        exam: any[],
      }
      ],
      amount: number,
      payerType: string,
      createdBy: string
    } = {
      examCycleId: this.studentDetails.examCycleId,
      instituteId: 1,
      studentExam: [{
        studentId: studentDetails.attributes.studentId[0],
        exam: [],
      }
      ],
      amount: this.amountToPay,
      payerType: "EXAM",
      createdBy: studentDetails.id
    }
    this.selectedExams.forEach((element: any) => {
      const examDetails: any = {
        id: element.examId,
        fee: this.costOfExam,
      }
      formBody.studentExam[0].exam.push(examDetails)
    })
    this.baseService.payFees(formBody)
    .subscribe((result: any) => {
      window.open(result.responseData.redirectUrl, "_blank");
    })
  }

}
