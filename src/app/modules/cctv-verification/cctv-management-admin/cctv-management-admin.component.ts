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
import { ToastrServiceService } from 'src/app/shared/services/toastr/toastr.service';

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
    ]
  examCycleControl = new FormControl('');

  tabs: any[] = [];
  isDataLoading: boolean = true;
  currentTabIndex = 0;
  instituteesTableColumns: TableColumn[] = [];
  instituteesTableData = []
  pageSize = 10;
  searcControl = '';
  breadcrumbItems = [
    { label: 'CCTV Management', url: '' },
  ]
  //#endregion

  constructor(
    private baseService: BaseService,
    private router: Router,
    private dialog: MatDialog,
    private toasterService: ToastrServiceService
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
        // TableColumns.push(
        //   {
        //     header: 'Alternate institute status',
        //     columnDef: 'assignedStatus',
        //     cell: (element: Record<string, any>) => `${element['assignedStatus']}`,
        //     cellStyle: {
        //       'background-color': '#0000000a', 'width': '200px', 'color': '#00000099'
        //     },
        //   }
        // )
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

  getExamCycles() {
    this.baseService.getExamCycleList$()
      .pipe(mergeMap((res: any) => {
        return this.baseService.formatExamCyclesForDropdown(res.responseData)
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

  //#region (table data)
  getInstitutesCCTVtableData(searchKey: string = '') {
    this.isDataLoading = true
    this.baseService.getAllExamCenterInstitutesList$()
    .pipe(mergeMap((response: any) => {
      return this.getformatInstitutesTablesData(response.responseData)
    }))
    .subscribe({
      next: (InstituteesCCTVtableData: any) => {
        this.getTablesData(InstituteesCCTVtableData)
        this.isDataLoading = false
      },
      error: (error: HttpErrorResponse) => {
        this.isDataLoading = false
        console.log(error);
        this.toasterService.showToastr('Something went wrong. Please try again later', 'Error', 'error', '');
    
      }
    })

  }

  getInstitutesCCTVtableDataByExamCycle(examCycleId: number | string) {
    this.isDataLoading = true
    this.baseService.getInstitutesListByExamCycle$(examCycleId)
    .pipe(mergeMap((response: any) => {
      return this.getformatInstitutesTablesData(response.responseData)
    }))
    .subscribe((InstituteesCCTVtableData: any) => {
      this.getTablesData(InstituteesCCTVtableData)
      this.isDataLoading = false
    })
  }

  getformatInstitutesTablesData(instituteesList: any) {
    const formattedInstitutesList: {
      instituteId: number,
      instituteName: string,
      instituteCode: string,
      district: string,
      cctvVerified: boolean,
      ipAddress: string,
      alternateExamCenterAssigned: boolean
    }[] = [];
    if (instituteesList && instituteesList.length) {
      instituteesList.forEach((institute: any) => {
        const formattedInstitute = {
          instituteId: institute.id,
          instituteName: institute.name,
          instituteCode: institute.instituteCode,
          district: institute.district,
          cctvVerified: institute.approvalStatus,
          ipAddress: institute.ipAddress,
          alternateExamCenterAssigned: institute.alternateExamCenterAssigned
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
          if (institute.cctvVerified === 'PENDING' || institute.cctvVerified === null) {
            institute.updateStatus == true;
            pendingInstitute['hasStyle'] = true;
            pendingInstitute['classes'] = {
              status: ['cursor-pointer', 'color-blue']
            }
            pendingInstitute['status'] = 'Approve / Reject';
          } else {
            pendingInstitute = null
          }
          break;
        }
        case 1: {
          if (institute.cctvVerified === 'APPROVED') {
            institute.updateStatus == true;
            pendingInstitute['hasStyle'] = true;
            pendingInstitute['classes'] = {
              status: ['cursor-pointer', 'color-blue']
            }
            pendingInstitute['status'] = 'Reject';
          } else {
            pendingInstitute = null
          }
          break;
        }
        case 2: {
          if (institute.cctvVerified === 'REJECTED') {
            institute.updateStatus == true;
            pendingInstitute['hasStyle'] = true;
            if (institute.alternateExamCenterAssigned) {
              pendingInstitute['classes'] = {
                status: ['disabled-btn']
              }
              pendingInstitute['assignedStatus'] = 'Assigned'
            } else {
              pendingInstitute['classes'] = {
                status: ['cursor-pointer', 'color-blue']
              }
              pendingInstitute['assignedStatus'] = 'Pending'
            }
            pendingInstitute['status'] = 'Enter alternate Institute';
          } else {
            pendingInstitute = null
          }
          break
        }
      }
      if (pendingInstitute !== null) {
        return pendingInstitute
      }
    })
    setTimeout(() => {
      this.isDataLoading = false;
    }, 0)
  }
  //#endregion

  //#endregion

  tabChange(event: any) {
    this.isDataLoading = true
    this.currentTabIndex = event.index;
    this.initializeTableColumns()
    if (this.examCycleControl.value) {
      this.getInstitutesCCTVtableDataByExamCycle(this.examCycleControl.value)
    } else {
      this.getInstitutesCCTVtableData();
    }
  }

  //#region (update cctv status)

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
          validators: ['required']
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
          type: 'APPROVED'
        },
        {
          btnText: 'Reject',
          positionClass: 'right',
          btnClass: 'btn-outline mr2',
          type: 'REJECTED'
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
          type: 'REJECTED'
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
          approvalStatus: response.type,
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
            if (res.statusInfo.statusMessage) {
              this.toasterService.showToastr(res.statusInfo.statusMessage, 'Success', 'success', '');
            }
            if (formBody.approvalStatus === 'Rejected') {
              this.currentTabIndex = 2
            } else if (formBody.approvalStatus === 'Approved') {
              this.currentTabIndex = 1
            }
            if (this.examCycleControl.value) {
              this.getInstitutesCCTVtableDataByExamCycle(this.examCycleControl.value)
            } else {
              this.getInstitutesCCTVtableData();
            }
          }
        })
    }
  }
  //#endregion

  //#region (assign alternate institute)
  assignAlternateInstitute(event: any) {

    this.getNearestInstitutesList(event)
  }

  getNearestInstitutesList(event: any) {
    const formBody = {
      district: event.district,
    }
    this.isDataLoading = true
    this.baseService.getNearestInstitutesList(formBody)
      .pipe(mergeMap((res: any) => {
        return this.formatNearestInstitutesList(res.responseData)
      }))
      .subscribe((response: any) => {
        const institutesList = response
        this.isDataLoading = false
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
        if (institute.approvalStatus === 'APPROVED') {
          const formattedInstitute = {
            id: institute.id,
            instituteName: institute.name,
            instituteCode: institute.instituteCode
          }
          formattedInstitutesList.push(formattedInstitute)
        }
      })
    }
    return of(formattedInstitutesList)
  }

  assignAlternateExamCenter(formBody: any) {
    this.baseService.assignAlternateExamCenter$(formBody)
    .subscribe((res) => {
      if (res) {
        if (res.statusInfo.statusMessage) {
          this.toasterService.showToastr(res.statusInfo.statusMessage, 'Success', 'success', '');
        }
        if (this.examCycleControl.value) {
          this.getInstitutesCCTVtableDataByExamCycle(this.examCycleControl.value)
        } else {
          this.getInstitutesCCTVtableData();
        }
      }
    })
  }
  //#endregion

  cancel() {
    this.router.navigateByUrl('')
  }

}

