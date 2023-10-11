import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { mergeMap, of } from 'rxjs';
import { BaseService } from 'src/app/service/base.service';
import { ConformationDialogComponent } from 'src/app/shared/components/conformation-dialog/conformation-dialog.component';
import { UploadDialogComponent } from 'src/app/shared/components/upload-dialog/upload-dialog.component';
import { ViewProofModalAdminComponent } from '../view-proof-modal-admin/view-proof-modal-admin.component';
import { HttpErrorResponse } from '@angular/common/http';

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
  ]
  dispatchesList = []
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private baseService: BaseService,
  ) { }

  ngOnInit(): void {
    this.getExamCycles();
  }

  getExamCycles() {
    this.baseService.getExamCycles()
      .subscribe((examCucles: any) => {
        this.examCycleList = examCucles.examCyclesList;
      })
  }

  getDispatches(examCycleId: string | null) {
    this.dispatchesList = []
    if (examCycleId) {
      const formBody = {
        examCycleId: examCycleId
      }
      this.baseService.getDispatchesList$(formBody)
        .pipe(mergeMap((response: any) => {
          return this.formateDispatches(response?.responseData)
        }))
        .subscribe((res: any) => {
          // if (res.dispatchesLsit && res.dispatchesLsit.length > 0) { // remove if when api working
          //   this.dispatchesList = res.dispatchesLsit
          // }
          this.dispatchesList = res.dispatchesLsit;
        })
    }
  }

  formateDispatches(dispatches: any) {
    const formatedDispatch: {
      dispatchesLsit: any[]
    } = {
      dispatchesLsit: []
    }

    // if (dispatches && dispatches.length) {
    //   dispatches.forEach((element: any) => {
    //     const formatedDispatch = {
    //       instituteName: element,
    //       instituteId: element,
    //       exam: element,
    //       dispatchDate: element,
    //       dispatchStatus: element,
    //       viewProof: element
    //     }

    //     result.dispatchesLsit.push(formatedDispatch)
    //   })
    // }
    // return of(result);


    formatedDispatch.dispatchesLsit = dispatches
    return of(formatedDispatch)
  }

  uplodeOrViewProof(dispatch: any) {
    if (dispatch.status === 'Dispatched') {
      // this.viewProof(dispatch.id)
      this.viewProof(1)
    } else if (dispatch.status === 'Pending') {
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
      console.log("file", result)
      if (result) {
        const formBody = {
          examCycleId: this.examCycle.value,
          examId: dispatch.examId,
          dispatchDate: result.dispatchDate,
          dispatchProofFile: result.files
        }
        this.baseService.uploadDispatch$(formBody)
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

  viewProof(dispatchId: any) {
    this.baseService.getDispatchesViewProof$(dispatchId)
    .subscribe({
      next: (res: any) => {
        if (res.responseData) {
          const dialogRef = this.dialog.open(ViewProofModalAdminComponent, {
            data: {
              documentLink: res.responseData,
              buttons: [
                {
                  btnText: 'Cancel',
                  positionClass: 'left',
                  btnClass: 'btn-outline-gray',
                  type: 'close'
                }
              ],
            },
            width: '700px',
            maxWidth: '90vw',
            maxHeight: '90vh'
          })
          dialogRef.afterClosed().subscribe((response: any) => {
            if (response) {
            }
          })
        }
      },
      error: (error: HttpErrorResponse) => {
        console.log(error)
      }
    })
  }

}
