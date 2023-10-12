import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ViewProofModalAdminComponent } from '../view-proof-modal-admin/view-proof-modal-admin.component';
import { BaseService } from 'src/app/service/base.service';
import { mergeMap, of } from 'rxjs';
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
      columnDef: 'viewProof',
      isSortable: true,
      cell: (element: Record<string, any>) => `${element['viewProof']}`,
      cellStyle: {
        'background-color': '#0000000a', 'width': '145px', 'color': '#00000099'
      },
      isAction: true,
      showDeleteIcon: false,
    }
  ]

  instituteTableData = [
    {
      instituteName: 'NEW COLLEGE OF NURSING',
      instituteId: '123',
      exam: 'Exam 1',
      dispatchDate: '29-06-2023',
      dispatchStatus: 'Dispatched',
      viewProof: 'View proof',
      classes: {
            viewProof: ['color-blue'],
            dispatchStatus: ['color-green'],
          }
    },
    {
      instituteName: 'NEW COLLEGE OF NURSING',
      instituteId: '123',
      exam: 'Exam 1',
      dispatchDate: '29-06-2023',
      dispatchStatus: 'Dispatched',
      viewProof: 'View proof',
      classes: {
            viewProof: ['color-blue'],
            dispatchStatus: ['color-green'],
          }
    },
    {
      instituteName: 'NEW COLLEGE OF NURSING',
      instituteId: '123',
      exam: 'Exam 1',
      dispatchDate: '29-06-2023',
      dispatchStatus: 'Dispatched',
      viewProof: 'View proof',
      classes: {
            viewProof: ['color-blue'],
            dispatchStatus: ['color-green'],
          }
    },
    {
      instituteName: 'NEW COLLEGE OF NURSING',
      instituteId: '123',
      exam: 'Exam 1',
      dispatchDate: '29-06-2023',
      dispatchStatus: 'Dispatched',
      viewProof: 'View proof',
      classes: {
            viewProof: ['color-blue'],
            dispatchStatus: ['color-green'],
          }
    },
    {
      instituteName: 'NEW COLLEGE OF NURSING',
      instituteId: '123',
      exam: 'Exam 1',
      dispatchDate: '29-06-2023',
      dispatchStatus: 'Pending',
      viewProof: '-',
      classes: {
        viewProof: ['color-blue'],
        dispatchStatus: ['color-blue'],
      }
    },
    {
      instituteName: 'NEW COLLEGE OF NURSING',
      instituteId: '123',
      exam: 'Exam 1',
      dispatchDate: '29-06-2023',
      dispatchStatus: 'Dispatched',
      viewProof: 'View proof',
      classes: {
            viewProof: ['color-blue'],
            dispatchStatus: ['color-green'],
          }
    },
    {
      instituteName: 'NEW COLLEGE OF NURSING',
      instituteId: '123',
      exam: 'Exam 1',
      dispatchDate: '29-06-2023',
      dispatchStatus: 'Pending',
      viewProof: '-',
      classes: {
        viewProof: ['color-blue'],
        dispatchStatus: ['color-blue'],
      }
    },
    {
      instituteName: 'NEW COLLEGE OF NURSING',
      instituteId: '123',
      exam: 'Exam 1',
      dispatchDate: '29-06-2023',
      dispatchStatus: 'Pending',
      viewProof: '-',
      classes: {
        viewProof: ['color-blue'],
        dispatchStatus: ['color-blue'],
      }
    },
    {
      instituteName: 'NEW COLLEGE OF NURSING',
      instituteId: '123',
      exam: 'Exam 1',
      dispatchDate: '29-06-2023',
      dispatchStatus: 'Dispatched',
      viewProof: 'View proof',
      classes: {
            viewProof: ['color-blue'],
            dispatchStatus: ['color-green'],
          }
    },
    {
      instituteName: 'NEW COLLEGE OF NURSING',
      instituteId: '123',
      exam: 'Exam 1',
      dispatchDate: '29-06-2023',
      dispatchStatus: 'Pending',
      viewProof: '-',
      classes: {
        viewProof: ['color-blue'],
        dispatchStatus: ['color-blue'],
      }
    },
    {
      instituteName: 'NEW COLLEGE OF NURSING',
      instituteId: '123',
      exam: 'Exam 1',
      dispatchDate: '29-06-2023',
      dispatchStatus: 'Dispatched',
      viewProof: 'View proof',
      classes: {
            viewProof: ['color-blue'],
            dispatchStatus: ['color-green'],
          }
    },
    {
      instituteName: 'NEW COLLEGE OF NURSING',
      instituteId: '123',
      exam: 'Exam 1',
      dispatchDate: '29-06-2023',
      dispatchStatus: 'Pending',
      viewProof: '-',
      classes: {
        viewProof: ['color-blue'],
        dispatchStatus: ['color-blue'],
      }
    },
    {
      instituteName: 'NEW COLLEGE OF NURSING',
      instituteId: '123',
      exam: 'Exam 1',
      dispatchDate: '29-06-2023',
      dispatchStatus: 'Dispatched',
      viewProof: 'View proof',
      classes: {
            viewProof: ['color-blue'],
            dispatchStatus: ['color-green'],
          }
    },
    {
      instituteName: 'NEW COLLEGE OF NURSING',
      instituteId: '123',
      exam: 'Exam 1',
      dispatchDate: '29-06-2023',
      dispatchStatus: 'Pending',
      viewProof: '-',
      classes: {
        viewProof: ['color-blue'],
        dispatchStatus: ['color-blue'],
      }
    },
    {
      instituteName: 'NEW COLLEGE OF NURSING',
      instituteId: '123',
      exam: 'Exam 1',
      dispatchDate: '29-06-2023',
      dispatchStatus: 'Dispatched',
      viewProof: 'View proof',
      classes: {
            viewProof: ['color-blue'],
            dispatchStatus: ['color-green'],
          }
    },
    {
      instituteName: 'NEW COLLEGE OF NURSING',
      instituteId: '123',
      exam: 'Exam 1',
      dispatchDate: '29-06-2023',
      dispatchStatus: 'Pending',
      viewProof: '-',
      classes: {
        viewProof: ['color-blue'],
        dispatchStatus: ['color-blue'],
      }
    },
    {
      instituteName: 'NEW COLLEGE OF NURSING',
      instituteId: '123',
      exam: 'Exam 1',
      dispatchDate: '29-06-2023',
      dispatchStatus: 'Pending',
      viewProof: '-',
      classes: {
        viewProof: ['color-blue'],
        dispatchStatus: ['color-blue'],
      }
    },
    {
      instituteName: 'NEW COLLEGE OF NURSING',
      instituteId: '123',
      exam: 'Exam 1',
      dispatchDate: '29-06-2023',
      dispatchStatus: 'Dispatched',
      viewProof: 'View proof',
      classes: {
            viewProof: ['color-blue'],
            dispatchStatus: ['color-green'],
          }
    },
    {
      instituteName: 'NEW COLLEGE OF NURSING',
      instituteId: '123',
      exam: 'Exam 1',
      dispatchDate: '29-06-2023',
      dispatchStatus: 'Dispatched',
      viewProof: 'View proof',
      classes: {
            viewProof: ['color-blue'],
            dispatchStatus: ['color-green'],
          }
    },
    {
      instituteName: 'NEW COLLEGE OF NURSING',
      instituteId: '123',
      exam: 'Exam 1',
      dispatchDate: '29-06-2023',
      dispatchStatus: 'Dispatched',
      viewProof: 'View proof',
      classes: {
            viewProof: ['color-blue'],
            dispatchStatus: ['color-green'],
          }
    },
  ]
  
  examCycleControl = new FormControl('');
  examControl = new FormControl('');

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
  ) {}

  ngOnInit(): void {
    this.intialisation()
  }

  intialisation() {
    this.getExamCycles()
  }

  getExamCycles() {
    this.baseService.getExamCycles()
      .subscribe((examCucles: any) => {
        this.examCycleList = examCucles.examCyclesList;
      })
  }

  getExams(examCycleId: number) {
    this.courses = []
    this.baseService.getExamsListByExamCycleId(examCycleId)
      .subscribe((result: any) => {
        this.courses = result.examsList
      })
  }

  getDispatches(examId: number) {
    if (this.examCycleControl.value && examId) {
      const formBody = {
        examCycleId: this.examCycleControl.value,
        examId: examId,
      }
      this.baseService.getDispatchesList$(formBody)
        .pipe((response: any) => {
          return this.formateDispatches(response?.responseData)
        })
        .subscribe((res: any) => {
          if (res.dispatchesLsit && res.dispatchesLsit.length > 0) { // remove if when api working
            this.instituteTableData = res.dispatchesLsit
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
          instituteName: element,
          instituteId: element,
          exam: element,
          dispatchDate: element,
          dispatchStatus: element,
          viewProof: element,
          classes: {
            viewProof: ['color-blue'],
            dispatchStatus: element.dispatchStatus === 'Pending' ? ['color-blue'] : ['color-green'],
          }
        }

        result.dispatchesLsit.push(formatedDispatch)
      })
    }
    return of(result);
  }

  //#region (view proof)
  viewProof(event: any) {
    const dispatchId = event.row.id
    this.baseService.getDispatchesViewProof$(dispatchId)
    .subscribe((res: any) => {
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
    })
  }
  //#endregion

}
