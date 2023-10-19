import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UploadDialogComponent } from 'src/app/shared/components/upload-dialog/upload-dialog.component';
import { ConformationDialogComponent } from 'src/app/shared/components/conformation-dialog/conformation-dialog.component';
import { BaseService } from 'src/app/service/base.service';
import { ToastrServiceService } from 'src/app/shared/services/toastr/toastr.service';

@Component({
  selector: 'app-modify-hall-ticket',
  templateUrl: './modify-hall-ticket.component.html',
  styleUrls: ['./modify-hall-ticket.component.scss']
})
export class ModifyHallTicketComponent implements OnInit {
  //#region (global variables)
  hallTicketDetails = {
    exmaCycleName: '',
    studentDetails: {
      firstName: '',
      lastName: '',
      roolNumber: '',
      DOB: '',
    },
    hallTicketDetqails: {
      courseName: '',
      courseYear: ''
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
      header: 'Start time',
      columnDef: 'startTime',
      cell: (element: Record<string, any>) => `${element['startTime']}`,
      cellStyle: {
        'background-color': '#0000000a', 'width': '135px', 'color': '#00000099'
      }
    }, {
      header: 'End time',
      columnDef: 'endTime',
      cell: (element: Record<string, any>) => `${element['endTime']}`,
      cellStyle: {
        'background-color': '#0000000a', 'width': '135px', 'color': '#00000099'
      }
    },
  ]
  examTableData = [ 
  ]
  isHallTicket = true

  studentDetails: FormGroup
  uplodedDocuments: any = []
  stateData: any | undefined;
  //#endregion

  //#region (constructor)
  constructor(
    private router: Router,
    private baseService: BaseService,
    private dialog: MatDialog,
    private toasterService: ToastrServiceService,
  ) {
    this.stateData = this.router?.getCurrentNavigation()?.extras.state;
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
    this.setHallTicketDetails()
  }

  setHallTicketDetails() {
    if (this.stateData) {
      console.log(this.stateData)
      this.studentDetails.setValue({
        firstName: this.stateData.firstName,
        lastName: this.stateData.lastName,
        roolNumber: this.stateData.enrollmentNumber,
        DOB: new Date(this.stateData.dateOfBirth),
        courseName: this.stateData.courseName,
        courseYear: this.stateData.courseYear
      })
      this.hallTicketDetails.exmaCycleName = this.stateData.examCycle.examCyclename;
      this.examTableData = this.stateData.exams;
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
              displayValue: 'Aadhar',
              value: 'Aadhar'
            },
            {
              displayValue: 'Driving Licence',
              value: 'DL'
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


  makeDataCorrectionRequest() {
    const Dob = new Date(this.studentDetails.value.DOB);
    const formData = new FormData();
    formData.append("studentId", "12");
    formData.append("proof", this.uplodedDocuments[0],this.uplodedDocuments[0].name);
    formData.append("updatedFirstName",this.studentDetails.value.firstName);
    formData.append("updatedLastName", this.studentDetails.value.lastName);
    formData.append("updatedDOB",  Dob.getFullYear()  + "-" + `${Dob.getMonth() + 1}` + "-" + Dob.getDate(),);
    
    // if (this.studentDetails.valid) {
   
     this.baseService.requestHallTicketModification$(formData).subscribe({
      next: (res: any) => {
        console.log(res)
        if (res && res.responseData) {
          this.toasterService.showToastr('Hall ticket modification request submitted successfully !!', 'Success', 'success', '');
          this.router.navigateByUrl('/candidate-portal/view-hallticket')
        }
      },
      error: (error: any) => {
        console.log(error.message)
        this.toasterService.showToastr('Hall ticket modification request submittion failed !!', 'Error', 'error', '');
      }
    })
    // }


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
