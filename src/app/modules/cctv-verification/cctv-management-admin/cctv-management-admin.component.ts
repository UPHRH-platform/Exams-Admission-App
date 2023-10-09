//#region (imports)
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, Routes } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CctvApprovalPopupComponent } from '../../../shared/components/cctv-approval-popup/cctv-approval-popup.component';
import { BaseService } from 'src/app/service/base.service';
import { mergeMap, of } from 'rxjs';
import { TableColumn } from 'src/app/interfaces/interfaces';
import { Tabs } from 'src/app/shared';
import { HttpErrorResponse } from '@angular/common/http';

interface Course {
  value: string;
  viewValue: string;
}

//#endregion

@Component({
  selector: 'app-cctv-management-admin',
  templateUrl: './cctv-management-admin.component.html',
  styleUrls: ['./cctv-management-admin.component.scss']
})
export class CctvManagementAdminComponent {

  //#region (global variables)
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
      }, {
        examCycleName: 'Exam Cycle 2',
        id: 2,
        courseId: '',
        status: '',
      }, {
        examCycleName: 'Exam Cycle 3',
        id: 3,
        courseId: '',
        status: '',
      },
    ]
  examCycleControl = new FormControl('');

  tabs: any[] = [];
  isDataLoading: boolean = true;
  currentTabIndex = 0;
  instituteesTableColumns: TableColumn[] = [];
  instituteesTableData = []
  pageSize = 10;
  searcControl = '';
  //#endregion

  breadcrumbItems = [
    { label: 'CCTV Management', url: '' },
  ]
  constructor(
    private baseService: BaseService,
    private router: Router,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit() {
    this.intialisation();
  }

  //#region (intialisation)
  intialisation() {
    this.initializeTabs()
    this.initializeTableColumns()
    this.getExamCycles()
    this.getInstitutesCCTVtableData()
  }

  initializeTabs() {
    this.tabs = Tabs['CCTV_Management'];
  }

  initializeTableColumns() {
    this.instituteesTableColumns = []
    const TableColumns = [
      {
        header: 'Institute name',
        columnDef: 'instituteName',
        isSortable: true,
        cell: (element: Record<string, any>) => `${element['instituteName']}`,
        cellStyle: {
          'background-color': '#0000000a',
          'color': '#00000099'
        },
      }, {
        header: 'Institute Code',
        columnDef: 'instituteCode',
        cell: (element: Record<string, any>) => `${element['instituteCode']}`,
        cellStyle: {
          'background-color': '#0000000a', 'width': '200px', 'color': '#00000099'
        },
      }, {
        header: 'District name',
        columnDef: 'district',
        cell: (element: Record<string, any>) => `${element['district']}`,
        cellStyle: {
          'background-color': '#0000000a', 'width': '165px', 'color': '#00000099'
        },
      },
    ]

    switch (this.currentTabIndex) {
      case 0: {
        TableColumns.push(
          {
            header: '',
            columnDef: 'status',
            cell: (element: Record<string, any>) => `${element['status']}`,
            cellStyle: {
              'background-color': '#0000000a', 'width': '200px', 'color': '#00000099'
            },
          })
        break;
      }
      case 1: {
        TableColumns.push(
          {
            header: 'IP address',
            columnDef: 'ipAddress',
            cell: (element: Record<string, any>) => `${element['ipAddress']}`,
            cellStyle: {
              'background-color': '#0000000a', 'width': '200px', 'color': '#00000099'
            },
          }
        );
        TableColumns.push(
          {
            header: 'status',
            columnDef: 'status',
            cell: (element: Record<string, any>) => `${element['status']}`,
            cellStyle: {
              'background-color': '#0000000a', 'width': '100px', 'color': '#00000099'
            },
          }
        )
        break;
      }
      case 2: {
        TableColumns.push(
          {
            header: 'IP address',
            columnDef: 'ipAddress',
            cell: (element: Record<string, any>) => `${element['ipAddress']}`,
            cellStyle: {
              'background-color': '#0000000a', 'width': '200px', 'color': '#00000099'
            },
          }
        );
        TableColumns.push(
          {
            header: '',
            columnDef: 'status',
            cell: (element: Record<string, any>) => `${element['status']}`,
            cellStyle: {
              'background-color': '#0000000a', 'width': '215px', 'color': '#00000099'
            },
          }
        );
        break;
      }
    }
    this.instituteesTableColumns = TableColumns
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

  formatExamCycles(response: any)  {
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

  getInstitutesCCTVtableData(searchKey: string = '') {
    this.baseService.getAllInstitutesList$()
    .pipe(mergeMap((response: any) => {
      return this.getformatInstitutesTablesData(response.responseData)
      // return this.getformatInstitutesTablesData(response.result.response)
    }))
    .subscribe((InstituteesCCTVtableData: any) => {
      this.getTablesData(InstituteesCCTVtableData)
    })
  }

  getformatInstitutesTablesData(instituteesList: any) {
    const formattedInstitutesList: {
      instituteId: number,
      instituteName: string,
      instituteCode: string,
      district: string,
      allowedForExamCentre: boolean,
      cctvVerified: boolean,
      ipAddress: string,
    }[] = [];
    if (instituteesList && instituteesList.length) {
      instituteesList.forEach((institute: any) => {
        institute = institute.institute
        const formattedInstitute = {
          instituteId: institute.id,
          instituteName: institute.instituteName,
          instituteCode: institute.instituteCode,
          district: institute.district,
          allowedForExamCentre: institute.allowedForExamCentre,
          cctvVerified: institute.cctvVerified,
          ipAddress: institute.ipAddress,
        }
        formattedInstitutesList.push(formattedInstitute)
      })
    }
    return of(formattedInstitutesList)
  }

  getTablesData(InstituteesCCTVtableData: any) {
    this.instituteesTableData = InstituteesCCTVtableData.filter((institute: any) => {
      let pendingInstitute: any = institute
      switch (this.currentTabIndex) {
        case 0: {
          if (institute.cctvVerified === false) {
            institute.updateStatus == true;
            pendingInstitute['hasStyle'] = true;
            pendingInstitute['cellStyle'] = {
              status: {
                'color': '#0074B6',
                'cursor': 'pointer',
              },
            }
            pendingInstitute['status'] = 'Approve / Reject';
          } else {
            pendingInstitute = null
          }
          break;
        }
        case 1: {
          if (institute.cctvVerified && institute.allowedForExamCentre ) {
            institute.updateStatus == true;
            pendingInstitute['hasStyle'] = true;
            pendingInstitute['cellStyle'] = {
              status: {
                'color': '#0074B6',
                'cursor': 'pointer',
              },
            }
            pendingInstitute['status'] = 'Reject';
          } else {
            pendingInstitute = null
          }
          break;
        }
        case 2: {
          if (institute.cctvVerified && institute.allowedForExamCentre === false) {
            institute.updateStatus == true;
            pendingInstitute['hasStyle'] = true;
            pendingInstitute['cellStyle'] = {
              status: {
                'color': '#0074B6',
                'cursor': 'pointer',
              },
            }
            pendingInstitute['status'] = 'Enter alternate Institute';
          } else {
            pendingInstitute = null
          }
          break
        }
      }
      if (pendingInstitute !== undefined) {
        return pendingInstitute
      }
    })
    setTimeout(() => {
      this.isDataLoading = false;
    }, 0)
  }

  //#endregion

  tabChange(event: any) {
    this.isDataLoading = true
    this.currentTabIndex = event.index;
    this.initializeTableColumns()
    switch (event.index) {
      case 0: {
        break;
      }
      case 1: {
        break;
      }
      case 2: {
        break;
      }
    }
    this.getInstitutesCCTVtableData()
  }
  //#region (approve or reject cctv status)

  updateInstituteCCTVStatus(event: any) {
    switch (this.currentTabIndex) {
      case 0: {
        this.ApproveOrRejectInstituteCCTV(event)
        break;
      }
      case 1: {
        this.RejectInstituteCCTV(event)
        break;
      }
      case 2: {
        this.getNearestInstitutesList(event)
        break;
      }
    }
  }

  ApproveOrRejectInstituteCCTV(event: any) {
    const dialogData = {
      controls: [
        {
          controlLable: 'Enter IP address',
          controlName: 'IPaddress',
          controlType: 'input',
          placeholder: 'Type here',
          value: event.ipAddress,
          validators: ['required'],
          disabled: true,
        }, {
          controlLable: 'Enter remarks',
          controlName: 'remarks',
          controlType: 'textArea',
          placeholder: 'Type here',
          value: '',
          validators: []
        },
      ],
      instituteId: event.instituteId,
      buttons: [
        {
          btnText: 'Cancel',
          positionClass: 'left',
          btnClass: 'btn-outline-gray',
          type: 'close'
        },
        {
          btnText: 'Approve',
          positionClass: 'right',
          btnClass: 'btn-full',
          type: 'Approved'
        },
        {
          btnText: 'Reject',
          positionClass: 'right',
          btnClass: 'btn-outline mr2',
          type: 'Rejected'
        },
      ],
    }
    this.openApproveOrRejectPopup(dialogData)
  }

  RejectInstituteCCTV(event: any) {
    const dialogData = {
      controls: [
        {
          controlLable: 'Enter IP address',
          controlName: 'IPaddress',
          controlType: 'input',
          placeholder: 'Type here',
          value: event.ipAddress,
          validators: ['required'],
          disabled: true
        }, {
          controlLable: 'Enter remarks',
          controlName: 'remarks',
          controlType: 'textArea',
          placeholder: 'Type here',
          value: '',
          validators: []
        },
      ],
      instituteId: event.instituteId,
      buttons: [
        {
          btnText: 'Cancel',
          positionClass: 'left',
          btnClass: 'btn-outline',
          type: 'close'
        },
        {
          btnText: 'Reject',
          positionClass: 'right',
          btnClass: 'btn-full',
          type: 'Rejected'
        },
      ],
    }
    this.openApproveOrRejectPopup(dialogData)
  }

  openApproveOrRejectPopup(dialogData: any) {
    const dialogRef = this.dialog.open(CctvApprovalPopupComponent, {
      data: dialogData,
      width: '700px',
      maxWidth: '90vw',
      maxHeight: '90vh'
    })

    dialogRef.afterClosed().subscribe((response: any) => {
      if (response) {
        const formBody = {
          ipAddress: response.form.IPaddress,
          remarks: response.form.remarks,
          status: response.type,
          instituteId: response.instituteId
        }
        this.updateCCTVstatus(formBody)
      }
    })
  }

  updateCCTVstatus(formBody: any) {
    if (formBody) {
      //add loader
      this.baseService.updateCCTVstatus$(formBody)
        .subscribe((res: any) => {
          if (res) {
            this.getInstitutesCCTVtableData();
          }
        })
    }
  }
  //#endregion

  assignAlternateInstitute(event: any) {

    this.getNearestInstitutesList(event)
  }

  getNearestInstitutesList(event: any) {
    const formBody = {
      district: event.district,
    }
    this.baseService.getNearestInstitutesList(formBody)
      .pipe(mergeMap((res: any) => {
        return this.formatNearestInstitutesList(res.responseData)
      }))
      .subscribe((response: any) => {
        const institutesList = response
        if (institutesList) {
          let nearestInstitutesList = institutesList
          const dialogRef = this.dialog.open(CctvApprovalPopupComponent, {
            data: {
              controls: [
                {
                  controlLable: 'Institute District',
                  controlName: 'instituteDistrict',
                  controlType: 'input',
                  placeholder: 'Type here',
                  value: 'Agra',
                  validators: ['required'],
                  readonly: true
                }, {
                  controlLable: 'Near Institute List',
                  controlName: 'institute',
                  controlType: 'select',
                  optionsList: nearestInstitutesList,
                  value: null,
                  placeholder: 'Select the Institute',
                  validators: ['required'],
                },
              ],
              instituteId: event.instituteId,
              buttons: [
                {
                  btnText: 'Cancel',
                  positionClass: 'left',
                  btnClass: 'btn-outline',
                  type: 'close'
                },
                {
                  btnText: 'Assign',
                  positionClass: 'right',
                  btnClass: 'btn-full',
                  type: 'assign'
                },
              ],
            },
            width: '700px',
            maxWidth: '90vw',
            maxHeight: '90vh'
          })
          dialogRef.afterClosed().subscribe((response: any) => {
            if (response) {
              const formBody = {
                instituteID: response.instituteId,
                alternateInstituteId: response.form.institute
              }
              this.assignAlternateExamCenter(formBody)
            }
          })
        }
      })
  }

  formatNearestInstitutesList(institutes: any) {
    const formattedInstitutesList: {
      id: number,
      instituteName: string,
      instituteCode: string,
    }[] = [];
    if (institutes && institutes.length) {
      institutes.forEach((institute: any) => {
        const formattedInstitute = {
          id: institute.institute.id,
          instituteName: institute.institute.instituteName,
          instituteCode: institute.institute.instituteCode
        }
        formattedInstitutesList.push(formattedInstitute)
      })
    }
    return of(formattedInstitutesList)
  }

  assignAlternateExamCenter(formBody: any) {
    this.baseService.assignAlternateExamCenter$(formBody)
    .subscribe(() => {
      this.getInstitutesCCTVtableData()
    })
  }

  cancel() {
    this.router.navigateByUrl('')
  }

}

