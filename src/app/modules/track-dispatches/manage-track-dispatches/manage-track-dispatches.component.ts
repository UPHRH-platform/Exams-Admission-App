import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
// import { ViewProofModalAdminComponent } from '../view-proof-modal-admin/view-proof-modal-admin.component';
import { BaseService } from 'src/app/service/base.service';
import { mergeMap, of } from 'rxjs';
// import { HttpErrorResponse } from '@angular/common/http';
import { ToastrServiceService } from 'src/app/shared/services/toastr/toastr.service';
import { ConformationDialogComponent } from 'src/app/shared/components/conformation-dialog/conformation-dialog.component';
import { HttpErrorResponse } from '@angular/common/http';

interface Course {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-manage-track-dispatches',
  templateUrl: './manage-track-dispatches.component.html',
  styleUrls: ['./manage-track-dispatches.component.scss']
})
export class ManageTrackDispatchesComponent implements OnInit  {
  //#region (Globla variables)
  courses: Course[] = [
  ];
  examCycleList: { 
    id: number; 
    examCycleName: string; 
    courseId: string; 
    status: string; 
  }[] = [
    {
      examCycleName: 'Exam Cycle 1',
      id: 1,
      courseId: '',
      status: '',
    },{
      examCycleName: 'Exam Cycle 2',
      id: 2,
      courseId: '',
      status: '',
    },{
      examCycleName: 'Exam Cycle 3',
      id: 3,
      courseId: '',
      status: '',
    },
  ]

  instituteTableHeader = [
    {
      header: 'Institute name',
      columnDef: 'instituteName',
      isSortable: true,
      cell: (element: Record<string, any>) => `${element['instituteName']}`,
      cellStyle: {
        'background-color': '#0000000a',
        'color': '#00000099'
      },
    },{
      header: 'Institute ID',
      columnDef: 'instituteId',
      isSortable: true,
      cell: (element: Record<string, any>) => `${element['instituteId']}`,
      cellStyle: {
        'background-color': '#0000000a', 'width': '160px', 'color': '#00000099'
      },
    },{
      header: 'Exam',
      columnDef: 'exam',
      isSortable: true,
      cell: (element: Record<string, any>) => `${element['exam']}`,
      cellStyle: {
        'background-color': '#0000000a', 'width': '160px', 'color': '#00000099'
      },
    },{
      header: 'Dispatch date',
      columnDef: 'dispatchDate',
      isSortable: true,
      cell: (element: Record<string, any>) => `${element['dispatchDate']}`,
      cellStyle: {
        'background-color': '#0000000a', 'width': '160px', 'color': '#00000099'
      },
    },{
      header: 'Dispatch Status',
      columnDef: 'dispatchStatus',
      isSortable: true,
      cell: (element: Record<string, any>) => `${element['dispatchStatus']}`,
      cellStyle: {
        'background-color': '#0000000a', 'width': '145px', 'color': '#00000099'
      },
    },{
      header: '',
      columnDef: 'downloadProof',
      isSortable: true,
      cell: (element: Record<string, any>) => `${element['downloadProof']}`,
      cellStyle: {
        'background-color': '#0000000a', 'width': '160px', 'color': '#00000099'
      },
      isAction: true,
      showDeleteIcon: false,
    }
  ]

  instituteTableData = []
  
  examCycleControl = new FormControl();
  examControl = new FormControl();

  // searcControl = '';
  // searchKey = ''
  showInstitutesTable = true

  breadcrumbItems = [
    { label: 'Manage Track Dispatches', url: '' },
  ]
  //#endregion

  constructor(
    private dialog: MatDialog,
    private baseService: BaseService,
    private toastrService: ToastrServiceService
  ) {}

  ngOnInit(): void {
    this.intialisation()
  }

  intialisation() {
    this.getExamCycles()
  }

  getExamCycles() {
    this.baseService.getExamCycleList$()
    .pipe(mergeMap((res: any) => {
      return this.baseService.formatExamCyclesForDropdown(res.responseData)
    }))
      .subscribe({
        next: (examCycles: any) => {
          this.examCycleList = examCycles.examCyclesList;
        },
        error: (err: HttpErrorResponse) => {
          this.toastrService.showToastr(err, 'Error', 'error', '')
        }
      })
  }

  getExams(examCycleId: number) {
    this.courses = []
    this.examControl.reset()
    this.baseService.getExamsByExamCycleId(examCycleId)
    .pipe(mergeMap((res: any) => {
      return this.baseService.formateExams(res.responseData)
    }))
      .subscribe({
        next: (result: any) => {
          this.courses = result.examsList
        },
        error: (err) => {
          this.toastrService.showToastr(err, 'Error', 'error', '')
        }
      })
  }

  getDispatches(examId: number) {
    if (this.examCycleControl.value && examId) {
      this.baseService.getDispatchesAllInstitutesList$(this.examCycleControl.value, examId)
        .pipe(mergeMap((response: any) => {
          return this.formateDispatches(response?.responseData)
        }))
        .subscribe({
          next: (res: any) => {
            if (res.dispatchesLsit && res.dispatchesLsit.length > 0) { // remove if when api working
              this.instituteTableData = res.dispatchesLsit
            }
          },
          error: (err) => {
            this.toastrService.showToastr(err, 'Error', 'error', '')
          }
        })
    }
  }

  formateDispatches(dispatches: any) {
    const result: {
      dispatchesLsit: any[]
    } = {
      dispatchesLsit: []
    }
    if (dispatches && dispatches.length) {
      dispatches.forEach((element: any) => {
        const formatedDispatch = {
          instituteName: element.instituteName,
          instituteId: element.instituteId,
          exam: element.examName,
          dispatchDate: element.updatedDate,
          dispatchStatus: element.proofUploaded ? 'Dispatched' : 'Pending',
          downloadProof: element.proofUploaded ? 'Download proof' : '-',
          // viewProof: element.proofUploaded ? 'View proof' : '-',
          dispatchProofFileLocation: element.dispatchProofFileLocation,
          classes: {
            // viewProof: ['color-blue'],
            downloadProof: ['color-blue'],
            dispatchStatus: element.proofUploaded ? ['color-green'] : ['color-blue'],
          }
        }

        result.dispatchesLsit.push(formatedDispatch)
      })
    }
    return of(result);
  }

  downloadProof(event: any) {
    const fileLocation = event.row.dispatchProofFileLocation;
    this.baseService.downloadPdf$(fileLocation)
    .subscribe(blob => {
      const downloadLink = document.createElement('a');
      const url = window.URL.createObjectURL(blob);
      downloadLink.href = url;
      downloadLink.download = event.row.instituteName + '_' + event.row.exam + '_dispatch_proof.pdf';
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

  //#region (view proof)
  // viewProof(event: any) {
  //   if (event.row.dispatchProofFileLocation && event.row.viewProof === 'View proof') {
  //     this.dialog.open(ViewProofModalAdminComponent, {
  //       data: {
  //         documentLink: event.row.dispatchProofFileLocation,
  //         buttons: [
  //           {
  //             btnText: 'Ok',
  //             positionClass: 'left',
  //             btnClass: 'btn-outline-gray',
  //             type: 'close'
  //           }
  //         ],
  //       },
  //       width: '700px',
  //       maxWidth: '90vw',
  //       maxHeight: '90vh'
  //     })
  //     // this.baseService.getDispatchesViewProof$(dispatchId)
  //     // .subscribe((res: any) => {
  //     //   const dialogRef = this.dialog.open(ViewProofModalAdminComponent, {
  //     //     data: {
  //     //       documentLink: res.responseData,
  //     //       buttons: [
  //     //         {
  //     //           btnText: 'Cancel',
  //     //           positionClass: 'left',
  //     //           btnClass: 'btn-outline-gray',
  //     //           type: 'close'
  //     //         }
  //     //       ],
  //     //     },
  //     //     width: '700px',
  //     //     maxWidth: '90vw',
  //     //     maxHeight: '90vh'
  //     //   })
    
  //     //   dialogRef.afterClosed().subscribe((response: any) => {
  //     //     if (response) {
  //     //     }
  //     //   })
  //     // })
  //   }
  // }
  //#endregion

}
