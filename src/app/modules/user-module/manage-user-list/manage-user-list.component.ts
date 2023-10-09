import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TableColumn } from 'src/app/interfaces/interfaces';
import { Tabs } from 'src/app/shared/config/tabs.config';
import { BaseService } from 'src/app/service/base.service';
import { HttpErrorResponse } from '@angular/common/http';
import { mergeMap, of } from 'rxjs';



@Component({
  selector: 'app-manage-user-list',
  templateUrl: './manage-user-list.component.html',
  styleUrls: ['./manage-user-list.component.scss']
})
export class ManageUserListComponent {
  tabs: any[] = [];
  isDataLoading: boolean = false;
  isEditData: boolean = false;  
  examCycleData: any[] = [];
  examCycleTableColumns: TableColumn[] = [];
  pageIndex = 0;
  pageSize = 10;
  length = 10;
  breadcrumbItems = [
    { label: 'Manage Users', url: '' },
  ]
  constructor(private router: Router, private dialog: MatDialog,
    private baseService : BaseService){
      this.getEnrollmentData()
    }
   

  ngOnInit() {
   this.initializeTabs();
  }

  

  initializeTabs() {
    this.tabs = Tabs['student_enrollment'];
    this.initializeColumns();
    this.getEnrollmentData();
  }


  getEnrollmentData() {
    this.isDataLoading = true;
    this.baseService.getUserData$()
    .pipe((mergeMap((response: any) => {
      return this.formateEnrollmentData(response)
    })))
    .subscribe({
      next:(res:any)=>{
        this.examCycleData = res.examCycleTableData
        setTimeout(() => {
          this.isDataLoading = false;
        }, 1000);

      },
      error: (error: HttpErrorResponse) => {
        this.isDataLoading = false;
        console.log(error)
      }

    })

  }

  formateEnrollmentData(enrollmentData: any) {
    const examCyclesData: {
      examCycleTableData: any[]
    } = {
      examCycleTableData: []
    }

    if (enrollmentData) {
      enrollmentData.forEach((userData: any) => {
        const examCycleData = {
          fullName: userData.fullName,
          email: userData.email,
          phoneNumber: userData.phoneNumber,
          role: userData.role,
          accountStatus: userData.accountStatus,
          hasStyle: true,
          cellStyle: {
            viewExamCycle: {
              'color': '#0074B6'
            }
          }
        }

        examCyclesData.examCycleTableData.push(examCycleData)
      })
    }

    return of(examCyclesData)
  }

  initializeColumns(): void {
    this.examCycleTableColumns   = [];
  
      this.examCycleTableColumns = [
        {
          columnDef: 'fullName',
          header: 'Full name',
          isSortable: true,
          isLink: false,
          cell: (element: Record<string, any>) => `${element['fullName']}`
        },
        {
          columnDef: 'email',
          header: 'Email',
          isSortable: true,
          isLink: false,
          cell: (element: Record<string, any>) => `${element['email']}`
        },
        {
          columnDef: 'phoneNumber',
          header: 'Phone Number',
          isSortable: true,
          isLink: false,
          cell: (element: Record<string, any>) => `${element['phoneNumber']}`
        },
        {
          columnDef: 'role',
          header: 'Role',
          isSortable: true,
          isLink: true,
          cell: (element: Record<string, any>) => `${element['role']}`
        },
        {
          columnDef: 'accountStatus',
          header: 'Account Status',
          isSortable: false,
          isLink: false,
          cell: (element: Record<string, any>) => `${element['accountStatus']}`,
          isAction: false
        },
        {
          columnDef: 'isAction',
          header: '',
          isSortable: false,
          isLink: false,
          isAction: true,
          isMenuOption: true,
          cell: (element: Record<string, any>) => ``,
          
        },
      ]
    }


  handlePageChange(event: any) {

  }

  onClickItem(event: any) {
  }

  onClickEdit(user: any){
    this.isEditData = true;
    this.baseService.setUserData(user)
    this.router.navigate(['user-management/user-form'])
  }
  
  goToCreate() {
    this.router.navigate(['user-management/user-form'])
  }
  
  getSearchParams(event: any) {

  }

  
  // onViewClick(event: any) {
  //   console.log(event);
  //   this.router.navigateByUrl('/manage-exam-cycle/details')
  // }
}
