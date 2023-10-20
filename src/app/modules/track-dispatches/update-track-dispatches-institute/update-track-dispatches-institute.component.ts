import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { mergeMap, of } from 'rxjs';
import { BaseService } from 'src/app/service/base.service';
import { ConformationDialogComponent } from 'src/app/shared/components/conformation-dialog/conformation-dialog.component';
import { UploadDialogComponent } from 'src/app/shared/components/upload-dialog/upload-dialog.component';
import { ViewProofModalAdminComponent } from '../view-proof-modal-admin/view-proof-modal-admin.component';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthServiceService } from 'src/app/core/services';
import { ToastrServiceService } from 'src/app/shared/services/toastr/toastr.service';

@Component({
  selector: 'app-update-track-dispatches-institute',
  templateUrl: './update-track-dispatches-institute.component.html',
  styleUrls: ['./update-track-dispatches-institute.component.scss']
})
export class UpdateTrackDispatchesInstituteComponent implements OnInit {

  examCycleList: {
    id: number;
    examCycleName: string;
  }[] = []
  examCycle = new FormControl();
  breadcrumbItems = [
    { label: 'Track Dispatches', url: '' }
  ];
  dispatchesList = [];
  loggedInUserId: string | number;
  instituteDetail: any;
  constructor(
    private dialog: MatDialog,
    private baseService: BaseService,
    private authService: AuthServiceService,
    private toastrService: ToastrServiceService
  ) { }

  ngOnInit(): void {
    this.initialization()
  }

  initialization() {
    this.loggedInUserId = this.authService.getUserRepresentation().id;
    this.getExamCycles();
    this.getInstituteByuserId()
  }

  getExamCycles() {
    this.baseService.getExamCycleList$()
    .pipe(mergeMap((res: any) => {
      return this.baseService.formatExamCyclesForDropdown(res.responseData)
    }))
    .subscribe({
      next: (examCucles: any) => {
        this.examCycleList = examCucles.examCyclesList;
        this.examCycle.setValue(this.examCycleList[this.examCycleList.length - 1].id)
      },
      error: (err: HttpErrorResponse) => {
        this.toastrService.showToastr(err, 'Error', 'error', '')
      }
    })
  }

  getInstituteByuserId() {
      this.baseService.getInstituteDetailsByUser(this.loggedInUserId)
      .pipe(mergeMap((res: any) => {
        return this.baseService.getInstituteVerifiedDetails(res.responseData[0].instituteCode);
      }))
      .subscribe({
        next: (res) => {
          this.instituteDetail = res.responseData;
        },
        error: (err: HttpErrorResponse) => {
          this.toastrService.showToastr(err, 'Error', 'error', '')
        }
      })
  }

  getDispatches(examCycleId: string | null) {
    this.dispatchesList = []
    if (examCycleId && this.instituteDetail) {
      this.baseService.getDispatchesListByInstitutes$(this.instituteDetail.id, examCycleId)
        .subscribe({
          next:(res: any) => {
            if (res.responseData && res.responseData.length > 0) {
              this.dispatchesList = res.responseData
            }
          },
          error: (err) => {
            this.toastrService.showToastr(err, 'Error', 'error', '')
          }
        })
    }
  }

  uplodeOrViewProof(dispatch: any) {
    if (dispatch.proofUploaded) {
      // this.viewProof(dispatch.dispatchProofFileLocation)
      this.downloadProof(dispatch)
    } else {
      this.uploadProof(dispatch)
    }
  }

  uploadProof(dispatch: any) {
    const dialogRef = this.dialog.open(UploadDialogComponent, {
      data: {
        heading: 'Upload proof',
        labelOne: 'Select Dispatch Date',
        labelTwo: 'Attach file(s)',
        dateSelect: 'dateSelect',
        acceptFiles: '.pdf',

        description: ['Hall ticket downloaded successfully'],
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
        let month = '' + (result.dispatchDate.getMonth() + 1);
        let day = '' + result.dispatchDate.getDate();
        let year = result.dispatchDate.getFullYear();

        month = month.length < 2 ? '0' + month : month
        day = day.length < 2 ? '0' + day : day
        const dispatchDate = year + '-' + month + '-' + day
        const request = {
          examCycleId: this.examCycle.value,
          examId: dispatch.examId,
          dispatchDate: dispatchDate,
          examCenterCode: this.instituteDetail.instituteCode
        }
        const formData = new FormData();
        for (let [key, value] of Object.entries(request)) {
          formData.append(`${key}`, `${value}`)
        }
        formData.append("dispatchProofFile", result.files[0], result.files[0].name);
        this.baseService.uploadDispatch$(formData)
          .subscribe({
            next: (res: any) => {
              this.openConformationDialog()
            },
            error: (err: HttpErrorResponse) => {
              this.toastrService.showToastr(err, 'Error', 'error', '')
            }
          })
      }
    })
  }

  openConformationDialog() {
    const conformationDialogRef = this.dialog.open(ConformationDialogComponent, {
      data: {
        dialogType: 'success',
        description: ['Dispatches uploaded successfully'],
        buttons: [
          {
            btnText: 'Ok',
            positionClass: 'center',
            btnClass: 'btn-full',
            response: true,
          },
        ],
      },
      width: '700px',
      height: '400px',
      maxWidth: '90vw',
      maxHeight: '90vh'
    })
    conformationDialogRef.afterClosed().subscribe(res => {
      this.getDispatches(this.examCycle.value)
    })
  }

  // viewProof(dispatchId: any) {
  //   this.baseService.getDispatchesViewProof$(dispatchId)
  //   .subscribe({
  //     next: (res: any) => {
  //       if (res.responseData) {
  //         const dialogRef = this.dialog.open(ViewProofModalAdminComponent, {
  //           data: {
  //             documentLink: res.responseData,
  //             buttons: [
  //               {
  //                 btnText: 'Cancel',
  //                 positionClass: 'left',
  //                 btnClass: 'btn-outline-gray',
  //                 type: 'close'
  //               }
  //             ],
  //           },
  //           width: '700px',
  //           maxWidth: '90vw',
  //           maxHeight: '90vh'
  //         })
  //         dialogRef.afterClosed().subscribe((response: any) => {
  //           if (response) {
  //           }
  //         })
  //       }
  //     },
  //     error: (error: HttpErrorResponse) => {
  //       console.log(error)
  //     }
  //   })
  // }

  downloadProof(dispatch: any) {
    const fileLocation = dispatch.dispatchProofFileLocation;
    this.baseService.downloadPdf$(fileLocation)
    .subscribe(blob => {
      const downloadLink = document.createElement('a');
      const url = window.URL.createObjectURL(blob);
      downloadLink.href = url;
      downloadLink.download = dispatch.examName + '_dispatch_proof.pdf';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      window.URL.revokeObjectURL(url);
      this.dialog.open(ConformationDialogComponent, {
        data: {
          dialogType: 'success',
          description: ['Dispatch proof downloaded successfully'],
          buttons: [
            {
              btnText: 'Ok',
              positionClass: 'center',
              btnClass: 'btn-full',
              response: true
            },
          ],
        },
        width: '700px',
        height: '400px',
        maxWidth: '90vw',
        maxHeight: '90vh'
      })
    });
  }

}
