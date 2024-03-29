import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TableColumn } from 'src/app/interfaces/interfaces';
import { ConformationDialogComponent } from 'src/app/shared/components/conformation-dialog/conformation-dialog.component';
import { UploadFileComponent } from 'src/app/modules/manage-exams/upload-file/upload-file.component';
import { HttpErrorResponse } from '@angular/common/http';
import { BaseService } from 'src/app/service/base.service';
import { ToastrServiceService } from 'src/app/shared/services/toastr/toastr.service';
import { FormControl } from '@angular/forms';

interface Course {
  value: string;
  viewValue: string;
}
interface Year {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-manage-exam-cycle-list',
  templateUrl: './manage-exam-cycle-list.component.html',
  styleUrls: ['./manage-exam-cycle-list.component.scss']
})
export class ManageExamCycleListComponent {
  isDataLoading: boolean = false;
  examCycleData: any[] = [];
  examCycleTableColumns: TableColumn[] = [];
  pageIndex = 0;
  pageSize = 10;
  length = 10;
  breadcrumbItems = [
    { label: 'Manage Exam Cycles and Exams', url: '' },
  ];
  constructor(private router: Router, private dialog: MatDialog,
     private baseService: BaseService, private toastrService: ToastrServiceService){}
  courses: Course[] = [];
  courseFormControl = new FormControl();
  examCycleControl = new FormControl();
  examCycleList = []
  years: Year[] = [
    {value: 'sem-1', viewValue: '2020'},
    {value: 'sem-2', viewValue: '2021'},
    {value: 'sem-3', viewValue: '2022'},
  ];

  ngOnInit() {
    this.initializeColumns();
    this.getExamCycleData();
    this.getCoursesList();
    this.getExamCycles()
  }

  getExamCycles() {
    this.baseService.getExamCycleList$()
      .subscribe({
        next: (res: any) => {
          this.examCycleList = res.responseData;
          const lastIndexSelected: any = this.examCycleList[this.examCycleList.length - 1];
          this.examCycleControl.setValue(lastIndexSelected.id)
        },
        error: (error: HttpErrorResponse) => {
          
          console.log(error);
           this.toastrService.showToastr('Something went wrong. Please try again later', 'Error', 'error', '');
    
        }
      })
  }

  onExamcycleIdSelect(e: any) {
    console.log("onExamcycleIdSelect---",e)
  }

  getCoursesList() {
    this.baseService.getAllCourses$().subscribe({
      next: (res: any) => {
        this.isDataLoading = false;
        this.courses = res.responseData;
        const lastIndexSelected: any = this.courses[this.courses.length - 1];
        this.courseFormControl.setValue(lastIndexSelected.id)
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message)
      }
    })
  }

  onCourseChange(em:any) {
   console.log("-----onCourseChange--------",em)
  }

  goToCreate() {
    this.router.navigate(['manage-exam-cycle/form'])
  }


  getExamCycleData() {
    this.isDataLoading = true;
  this.baseService.getExamCycleList$().subscribe({
    next: (res) => {
      console.log("res =>", res);
      this.isDataLoading = false;
      this.examCycleData = res.responseData.reverse();
      this.examCycleData.map((obj) => {
        obj.courseName = obj.course?.courseName;
      });
    },
    error: (error: HttpErrorResponse) => {
      this.isDataLoading = false;
      if(error.error.error){
        this.toastrService.showToastr(error.error.error.message, 'Error', 'error', '');
      } else{
        this.toastrService.showToastr('Something went wrong. Please try again later', 'Error', 'error', '');
      }
      
    }
  })
  }

  initializeColumns(): void {
    this.examCycleTableColumns = [];
  
      this.examCycleTableColumns = [
        {
          columnDef: 'examCycleName',
          header: 'Exam cycle',
          isSortable: true,
          isLink: false,
          cell: (element: Record<string, any>) => `${element['examCycleName']}`
        },
        {
          columnDef: 'courseName',
          header: 'Course Name',
          isSortable: true,
          isLink: false,
          cell: (element: Record<string, any>) => `${element['courseName']}`
        },
        {
          columnDef: 'startDate',
          header: 'Start Date',
          isSortable: true,
          isLink: false,
          cell: (element: Record<string, any>) => {
            return this.baseService.reverseDate(element['startDate'])
          }
        },
        {
          columnDef: 'endDate',
          header: 'End Date',
          isSortable: true,
          isLink: true,
          cell: (element: Record<string, any>) => {
            return this.baseService.reverseDate(element['endDate'])
          }
        },
        {
          columnDef: 'viewExamCycle',
          header: '',
          isSortable: false,
          isLink: false,
          classes: ['color-blue'],
          cell: (element: Record<string, any>) => `View`,
          isAction: true
        },
        {
          columnDef: 'deleteAction',
          header: '',
          isSortable: false,
          isLink: false,
          isAction: true,
          showDeleteIcon: true,
          cell: (element: Record<string, any>) => ``
        },
      ]
    }

  
  handlePageChange(event: any) {
  }

  onClickItem(event: any) {
    if(event.columnDef && event.columnDef == 'deleteAction') {
      this.onDeleteClick(event.row);
    }
    else {
    this.router.navigate(['/manage-exam-cycle/form/'+event.id]);
    }
  }

  onDeleteClick(event: any) {
    const dialogRef = this.dialog.open(ConformationDialogComponent, {
      data: {
        dialogType: 'confirmation',
        header: 'Disable exam cycle?',
        description: ["Are you sure you want to disable the exam cycle ?  "],
        buttons: [
          {
            btnText: 'Disable',
            positionClass: 'right',
            btnClass: 'btn-full',
            response: true
          },
          {
            btnText: 'Cancel',
            positionClass: 'right',
            btnClass: 'btn-outline mr2',
            response: false
          },
        ],
      },
      width: '700px',
      height: '300px',
      maxWidth: '90vw',
      maxHeight: '30vh'
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isDataLoading = true;
        this.baseService.deleteExamCycle(event.id).subscribe({
          next: (res) => {
            this.isDataLoading = false;
            this.toastrService.showToastr('Exam cycle deleted successfully', 'Success', 'success', '');
            this.getExamCycleData()
          },
          error: (err: HttpErrorResponse) => {
            console.log("Entered error loop");
            this.isDataLoading = false;
            this.toastrService.showToastr('Something went wrong. Please try again later', 'Error', 'error', '');
          }
        })
        
      }
    })
  }

  getSearchParams(event: any) {

  }

  openBulkUploadModal() {
      const heading = "Upload Exam cycle/List"
      const dialogRef = this.dialog.open(UploadFileComponent, {
      data: {
                heading: heading,     
                // labelOne: 'Select Dispatch Date',
                labelTwo:'Attach file(s)',
                // dateSelect: 'dateSelect',  
  
                // select: {
                //   selectCycleList: [
                //     {
                //       displayValue: 'Exam 1',
                //       value: 'Exam 1'
                //     },
                //     {
                //       displayValue: 'Exam 2',
                //       value: 'Exam 2'
                //     }
                //   ]
                // },
  
  
                description: [''],
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
            const dialogRef = this.dialog.open(ConformationDialogComponent, {
              data: {
              },
              width: '40vh',
              height: '20vh',
              maxWidth: '90vw',
              maxHeight: '90vh'
            })
            dialogRef.afterClosed().subscribe(files => {
              if (files) {
               
              }
            })        
          }
      })
    }

  onViewClick(event: any) {
    console.log(event);
    this.router.navigateByUrl('/manage-exam-cycle/details')
  }
}
