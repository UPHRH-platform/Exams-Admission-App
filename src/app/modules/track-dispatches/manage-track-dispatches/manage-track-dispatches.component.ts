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
    {value: 'bsc', viewValue: 'BSc'},
    {value: 'msc', viewValue: 'MSc'},
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
    },
    
    {
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
      hasStyle: true,
      cellStyle: {
        viewProof: {
          'color': '#0074B6'
        },
        dispatchStatus:{
          'color': '#1D8923'
        }
      }
    },
    {
      instituteName: 'NEW COLLEGE OF NURSING',
      instituteId: '123',
      exam: 'Exam 1',
      dispatchDate: '29-06-2023',
      dispatchStatus: 'Dispatched',
      viewProof: 'View proof',
      hasStyle: true,
      cellStyle: {
        viewProof: {
          'color': '#0074B6'
        },
        dispatchStatus:{
          'color': '#1D8923'
        }
      }
    },
    {
      instituteName: 'NEW COLLEGE OF NURSING',
      instituteId: '123',
      exam: 'Exam 1',
      dispatchDate: '29-06-2023',
      dispatchStatus: 'Dispatched',
      viewProof: 'View proof',
      hasStyle: true,
      cellStyle: {
        viewProof: {
          'color': '#0074B6'
        },
        dispatchStatus:{
          'color': '#1D8923'
        }
      }
    },
    {
      instituteName: 'NEW COLLEGE OF NURSING',
      instituteId: '123',
      exam: 'Exam 1',
      dispatchDate: '29-06-2023',
      dispatchStatus: 'Dispatched',
      viewProof: 'View proof',
      hasStyle: true,
      cellStyle: {
        viewProof: {
          'color': '#0074B6'
        },
        dispatchStatus:{
          'color': '#1D8923'
        }
      }
    },
    {
      instituteName: 'NEW COLLEGE OF NURSING',
      instituteId: '123',
      exam: 'Exam 1',
      dispatchDate: '29-06-2023',
      dispatchStatus: 'Pending',
      viewProof: '-',
      hasStyle: true,
      cellStyle: {
        viewProof: {
          'color': '#0074B6'
        },
        dispatchStatus:{
          'color': 'Pending' ? '#0074B6' : '#1D8923'
        }
      }
    },
    {
      instituteName: 'NEW COLLEGE OF NURSING',
      instituteId: '123',
      exam: 'Exam 1',
      dispatchDate: '29-06-2023',
      dispatchStatus: 'Dispatched',
      viewProof: 'View proof',
      hasStyle: true,
      cellStyle: {
        viewProof: {
          'color': '#0074B6'
        },
        dispatchStatus:{
          'color': '#1D8923'
        }
      }
    },
    {
      instituteName: 'NEW COLLEGE OF NURSING',
      instituteId: '123',
      exam: 'Exam 1',
      dispatchDate: '29-06-2023',
      dispatchStatus: 'Pending',
      viewProof: '-',
      hasStyle: true,
      cellStyle: {
        viewProof: {
          'color': '#0074B6'
        },
        dispatchStatus:{
          'color': 'Pending' ? '#0074B6' : '#1D8923'
        }
      }
    },
    {
      instituteName: 'NEW COLLEGE OF NURSING',
      instituteId: '123',
      exam: 'Exam 1',
      dispatchDate: '29-06-2023',
      dispatchStatus: 'Pending',
      viewProof: '-',
      hasStyle: true,
      cellStyle: {
        viewProof: {
          'color': '#0074B6'
        },
        dispatchStatus:{
          'color': 'Pending' ? '#0074B6' : '#1D8923'
        }
      }
    },
    {
      instituteName: 'NEW COLLEGE OF NURSING',
      instituteId: '123',
      exam: 'Exam 1',
      dispatchDate: '29-06-2023',
      dispatchStatus: 'Dispatched',
      viewProof: 'View proof',
      hasStyle: true,
      cellStyle: {
        viewProof: {
          'color': '#0074B6'
        },
        dispatchStatus:{
          'color': '#1D8923'
        }
      }
    },
    {
      instituteName: 'NEW COLLEGE OF NURSING',
      instituteId: '123',
      exam: 'Exam 1',
      dispatchDate: '29-06-2023',
      dispatchStatus: 'Pending',
      viewProof: '-',
      hasStyle: true,
      cellStyle: {
        viewProof: {
          'color': '#0074B6'
        },
        dispatchStatus:{
          'color': 'Pending' ? '#0074B6' : '#1D8923'
        }
      }
    },
    {
      instituteName: 'NEW COLLEGE OF NURSING',
      instituteId: '123',
      exam: 'Exam 1',
      dispatchDate: '29-06-2023',
      dispatchStatus: 'Dispatched',
      viewProof: 'View proof',
      hasStyle: true,
      cellStyle: {
        viewProof: {
          'color': '#0074B6'
        },
        dispatchStatus:{
          'color': '#1D8923'
        }
      }
    },
    {
      instituteName: 'NEW COLLEGE OF NURSING',
      instituteId: '123',
      exam: 'Exam 1',
      dispatchDate: '29-06-2023',
      dispatchStatus: 'Pending',
      viewProof: '-',
      hasStyle: true,
      cellStyle: {
        viewProof: {
          'color': '#0074B6'
        },
        dispatchStatus:{
          'color': 'Pending' ? '#0074B6' : '#1D8923'
        }
      }
    },
    {
      instituteName: 'NEW COLLEGE OF NURSING',
      instituteId: '123',
      exam: 'Exam 1',
      dispatchDate: '29-06-2023',
      dispatchStatus: 'Dispatched',
      viewProof: 'View proof',
      hasStyle: true,
      cellStyle: {
        viewProof: {
          'color': '#0074B6'
        },
        dispatchStatus:{
          'color': '#1D8923'
        }
      }
    },
    {
      instituteName: 'NEW COLLEGE OF NURSING',
      instituteId: '123',
      exam: 'Exam 1',
      dispatchDate: '29-06-2023',
      dispatchStatus: 'Pending',
      viewProof: '-',
      hasStyle: true,
      cellStyle: {
        viewProof: {
          'color': '#0074B6'
        },
        dispatchStatus:{
          'color': 'Pending' ? '#0074B6' : '#1D8923'
        }
      }
    },
    {
      instituteName: 'NEW COLLEGE OF NURSING',
      instituteId: '123',
      exam: 'Exam 1',
      dispatchDate: '29-06-2023',
      dispatchStatus: 'Dispatched',
      viewProof: 'View proof',
      hasStyle: true,
      cellStyle: {
        viewProof: {
          'color': '#0074B6'
        },
        dispatchStatus:{
          'color': '#1D8923'
        }
      }
    },
    {
      instituteName: 'NEW COLLEGE OF NURSING',
      instituteId: '123',
      exam: 'Exam 1',
      dispatchDate: '29-06-2023',
      dispatchStatus: 'Pending',
      viewProof: '-',
      hasStyle: true,
      cellStyle: {
        viewProof: {
          'color': '#0074B6'
        },
        dispatchStatus:{
          'color': 'Pending' ? '#0074B6' : '#1D8923'
        }
      }
    },
    {
      instituteName: 'NEW COLLEGE OF NURSING',
      instituteId: '123',
      exam: 'Exam 1',
      dispatchDate: '29-06-2023',
      dispatchStatus: 'Pending',
      viewProof: '-',
      hasStyle: true,
      cellStyle: {
        viewProof: {
          'color': '#0074B6'
        },
        dispatchStatus:{
          'color': 'Pending' ? '#0074B6' : '#1D8923'
        }
      }
    },
    {
      instituteName: 'NEW COLLEGE OF NURSING',
      instituteId: '123',
      exam: 'Exam 1',
      dispatchDate: '29-06-2023',
      dispatchStatus: 'Dispatched',
      viewProof: 'View proof',
      hasStyle: true,
      cellStyle: {
        viewProof: {
          'color': '#0074B6'
        },
        dispatchStatus:{
          'color': '#1D8923'
        }
      }
    },
    {
      instituteName: 'NEW COLLEGE OF NURSING',
      instituteId: '123',
      exam: 'Exam 1',
      dispatchDate: '29-06-2023',
      dispatchStatus: 'Dispatched',
      viewProof: 'View proof',
      hasStyle: true,
      cellStyle: {
        viewProof: {
          'color': '#0074B6'
        },
        dispatchStatus:{
          'color': '#1D8923'
        }
      }
    },
    {
      instituteName: 'NEW COLLEGE OF NURSING',
      instituteId: '123',
      exam: 'Exam 1',
      dispatchDate: '29-06-2023',
      dispatchStatus: 'Dispatched',
      viewProof: 'View proof',
      hasStyle: true,
      cellStyle: {
        viewProof: {
          'color': '#0074B6'
        },
        dispatchStatus:{
          'color': '#1D8923'
        }
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

  //#region (intialisation)
  intialisation() {
    this.getExamCycles()
    this.getDispatches()
  }

  //#region (exam cycles)
  getExamCycles() {
    this.baseService.getExamCycleList()
      .pipe(mergeMap((res: any) => {
        return this.formatExamCycles(res.responseData)
      }))
      .subscribe({
        next: (res: any) => {
          this.examCycleList = res.examCyclesList;
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        }
      })
  }

  formatExamCycles(response: any) {
    const examCycles: {
      examCyclesList: {
        id: number;
        examCycleName: string;
        courseId: string;
        status: string;
      }[]
    } = {
      examCyclesList: []
    }
    if (response && response.length > 0) {
      response.forEach((examCycle: any) => {
        const exam = {
          id: examCycle.id,
          examCycleName: examCycle.examCycleName,
          courseId: examCycle.courseId,
          status: examCycle.status,
        }
        examCycles.examCyclesList.push(exam)
      })
    }
    return of(examCycles)
  }
  //#endregion


  getDispatches() {
    this.baseService.getDispatchesList$()
      .pipe((response: any) => {
        return this.formateDispatches(response.result.response)
      })
      .subscribe((res: any) => {
        this.instituteTableData = res.dispatchesLsit
      })
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
          hasStyle: true,
          cellStyle: {
            viewProof: {
              'color': '#0074B6'
            },
            dispatchStatus: {
              'color': '#1D8923'
            }
          }
        }

        result.dispatchesLsit.push(formatedDispatch)
      })
    }
    return of(result);
  }
  //#endregion


  //#region (get exams)
  getExams(examCycleId: number) {
    this.courses = []
    const formBody = {} 
    this.baseService.getExamsByExamCycleId(examCycleId)
    .pipe(mergeMap((response: any) => {
      return this.formateExams(response.result.response)
    }))
    .subscribe((result: any) => {
      this.courses = result.examsList
    })
  }

  formateExams(exams: any) {
    const result: {
      examsList: any[]
    } = {
      examsList: []
    }
    if (exams && exams.length) {
      exams.forEach((exam: any) => {
        const formatedexame = {
          value: exam.id, 
          viewValue: exam.examName
        }
        result.examsList.push(formatedexame)
      })
    }
    return of(result);
  }
  //#endregion

  //#region (view proof)
  viewProof(event: any) {
    const dialogRef = this.dialog.open(ViewProofModalAdminComponent, {
      data: {
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
  //#endregion

}
