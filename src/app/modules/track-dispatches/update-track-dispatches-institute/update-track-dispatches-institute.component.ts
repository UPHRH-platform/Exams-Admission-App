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
import { DomSanitizer } from '@angular/platform-browser';

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
  examCycle = new FormControl('');
  breadcrumbItems = [
    { label: 'Track Dispatches', url: '' }
  ];
  dispatchesList = [];
  loggedInUserId: string | number;
  instituteDetail: any;
  pdfUrl: any;
  downloadPdf = false;
  constructor(
    private dialog: MatDialog,
    private baseService: BaseService,
    private authService: AuthServiceService,
    private toastrService: ToastrServiceService,
    private sanitizer: DomSanitizer
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
      .subscribe((examCucles: any) => {
        this.examCycleList = examCucles.examCyclesList;
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
      this.downloadProof(dispatch.dispatchProofFileLocation)
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
            error: (error: HttpErrorResponse) => {
              console.log(error);
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

  downloadProof(dispatchProofFileLocation: string) {
    this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(dispatchProofFileLocation);
    this.downloadPdf = true;
    setTimeout(() => {
      this.downloadPdf = false;
    }, 500);

  }

}
