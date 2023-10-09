import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CandidatePortalService } from '../services/candidate-portal.service';
import { MatDialog } from '@angular/material/dialog';
import { UploadDialogComponent } from 'src/app/shared/components/upload-dialog/upload-dialog.component';
import { ConformationDialogComponent } from 'src/app/shared/components/conformation-dialog/conformation-dialog.component';

@Component({
  selector: 'app-modify-hall-ticket',
  templateUrl: './modify-hall-ticket.component.html',
  styleUrls: ['./modify-hall-ticket.component.scss']
})
export class ModifyHallTicketComponent implements OnInit {
  //#region (global variables)
  hallTicketDetails = {
    exmaCycleName: 'Exam Cycle 1',
    studentDetails: {
      firstName: 'Rajash',
      lastName: 'Kumaravel',
      roolNumber: '12345 89078',
      DOB: '01-24-1998',
    },
    hallTicketDetqails: {
      courseName: 'M. Sc. Nursing',
      courseYear: '2022 - 2023'
    }
  }
  examTableHeader = [
    {
      header: 'Name of exam',
      columnDef: 'examName',
      cell: (element: Record<string, any>) => `${element['examName']}`,
      cellStyle: {
        'background-color': '#0000000a',
        'color': '#00000099'
      }
    }, {
      header: 'Exam date',
      columnDef: 'examDate',
      cell: (element: Record<string, any>) => `${element['examDate']}`,
      cellStyle: {
        'background-color': '#0000000a', 'width': '135px', 'color': '#00000099'
      }
    }, {
      header: 'Exam time',
      columnDef: 'examTime',
      cell: (element: Record<string, any>) => `${element['examTime']}`,
      cellStyle: {
        'background-color': '#0000000a', 'width': '135px', 'color': '#00000099'
      }
    }, {
      header: 'Duration',
      columnDef: 'examDuration',
      cell: (element: Record<string, any>) => `${element['examDuration']}`,
      cellStyle: {
        'background-color': '#0000000a', 'width': '135px', 'color': '#00000099'
      }
    },
  ]
  examTableData = [
    {
      examName: 'Exam 1',
      examDate: '23-03-2024',
      examTime: '10:00 AM',
      examDuration: '3 Hours',
    }, {
      examName: 'Exam 2',
      examDate: '24-03-2024',
      examTime: '10:00 AM',
      examDuration: '3 Hours',
    }, {
      examName: 'Exam 3',
      examDate: '25-03-2024',
      examTime: '10:00 AM',
      examDuration: '3 Hours',
    },
  ]
  isHallTicket = true

  studentDetails: FormGroup
  uplodedDocuments: any = []
  //#endregion

  //#region (constructor)
  constructor(
    private router: Router,
    private candidatePortalService: CandidatePortalService,
    private dialog: MatDialog
  ) {
    this.studentDetails = new FormGroup({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      roolNumber: new FormControl(null, [Validators.required]),
      DOB: new FormControl(null, [Validators.required]),
      courseName: new FormControl(null, [Validators.required]),
      courseYear: new FormControl(null, [Validators.required]),
    })
  }
  //#endregion

  ngOnInit(): void {
    this.intialisation()
  }

  intialisation() {
    this.getHallTicketDetails()
  }

  getHallTicketDetails() {
    this.candidatePortalService.getHallTicketDetails()
    // .pipe(mergeMap((res: any) => {
    //   return this.formateExamDetails(res)
    // })).subscribe((hallTicketDetails: any)) {
    this.patchHallticketDetails(this.hallTicketDetails.studentDetails)
    // }
  }

  // formateHallTicketDetails(examData: any) {
  //   let formatedData = examData
  //   return formatedData;
  // }

  patchHallticketDetails(hallTicketDetails: any) {
    if (hallTicketDetails) {
      const dob = new Date(hallTicketDetails.DOB);
      this.studentDetails.setValue({
        firstName: hallTicketDetails.firstName,
        lastName: hallTicketDetails.lastName,
        roolNumber: hallTicketDetails.roolNumber,
        DOB: dob,
        courseName: this.hallTicketDetails.hallTicketDetqails.courseName,
        courseYear: this.hallTicketDetails.hallTicketDetqails.courseYear
      })
    }
  }

  browseFile() {
    const dialogRef = this.dialog.open(UploadDialogComponent, {
      data: {
        heading: 'Attach proof for modification',
        labelOne: 'Select ID type',
        labelTwo: 'Attach file(s)',
        hidePreview: true,
        select: {
          selectCycleList: [
            {
              displayValue: 'Exam 1',
              value: 'Exam 1'
            },
            {
              displayValue: 'Exam 2',
              value: 'Exam 2'
            }
          ]
        },
        buttons: [
          {
            btnText: 'Browse',
            positionClass: 'right ml2',
            btnClass: 'btn-full',
            showBtn: 1,
            hideButton: false,
            btnType: 'browse'
          },
          {
            btnText: 'Upload',
            positionClass: 'right ml2',
            btnClass: 'btn-full',
            btnType: 'submit',
            hideButton: true,
          },
          {
            btnText: 'Cancel',
            positionClass: 'right',
            btnClass: 'btn-outline',
            hideButton: false,
            btnType: 'close'
          },
        ],
      },
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.uplodedDocuments.push(result.files[0])
      }
    })
  }

  submitDetails() {
    // if (this.studentDetails.valid) {
    const formatedDetails = this.formateStudentDetails(this.studentDetails.value);
    // this.candidatePortalService.requestHallTicketModification(formatedDetails)
    // .subscribe((result: any) => {
    //   if (result) {
    this.router.navigateByUrl('/candidate-portal/view-hallticket')
    //   }
    // })
    // }
  }

  formateStudentDetails(studentDetails: any) {
    return studentDetails
  }

  viewDocument() {}

  removeAttacment(index: number) {
    if (this.uplodedDocuments.length > 0) {
      this.uplodedDocuments.splice(index, 1)
    }
  }

  cancel() {
    this.router.navigateByUrl('/candidate-portal/view-hallticket')
  }
}
