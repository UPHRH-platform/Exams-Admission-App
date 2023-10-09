import { Component } from '@angular/core';
import { FeeManagementService } from '../../fee-management/services/fee-management.service';
import { FormControl } from '@angular/forms';
import { UploadDialogComponent } from 'src/app/shared/components/upload-dialog/upload-dialog.component';
import { ConformationDialogComponent } from 'src/app/shared/components/conformation-dialog/conformation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

import { BaseService } from '../../../service/base.service';
import { HttpErrorResponse } from '@angular/common/http';
interface Course {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-manage-result-admin',
  templateUrl: './manage-result-admin.component.html',
  styleUrls: ['./manage-result-admin.component.scss']
})
export class ManageResultAdminComponent {
  selectedCellDetails: any;
  isDataLoading: boolean = false;
  studentResultData: any[] = [];


  
  courses: Course[] = [
    {value: 'bsc', viewValue: 'BSc'},
    {value: 'msc', viewValue: 'MSc'},
  ];
  examCycleList = [
    {
      examName: 'Exam Cycle 1',
      value: '1'
    },{
      examName: 'Exam Cycle 2',
      value: '2'
    },{
      examName: 'Exam Cycle 3',
      value: '3'
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
      header: 'Course',
      columnDef: 'course',
      isSortable: true,
      cell: (element: Record<string, any>) => `${element['course']}`,
      cellStyle: {
        'background-color': '#0000000a', 'width': '160px', 'color': '#00000099'
      },
    },{
      header: 'Internal marks',
      columnDef: 'internalMarksProvided',
      isSortable: false,
      cell: (element: Record<string, any>) => `${element['internalMarksProvided']}`,
      cellStyle: {
        'background-color': '#0000000a',
        'color': '#00000099'
      },
      hasStyle: true,
      isAction: true,
    },{
      header: 'Final marks',
      columnDef: 'finalMarksProvided',
      isSortable: false,
      cell: (element: Record<string, any>) => `${element['finalMarksProvided']}`,
      cellStyle: {
        'background-color': '#0000000a',
        'color': '#00000099'
      },
      hasStyle: true,
      isAction: true,
    },
    {
      header: 'Revised final marks',
      columnDef: 'revisedFinalMarksProvided',
      isSortable: false,
      cell: (element: Record<string, any>) => `${element['revisedFinalMarksProvided']}`,
      cellStyle: {
        'background-color': '#0000000a',
        'color': '#00000099'
      },
      isAction: true,
      hasStyle: true,
    },    
    {
      header: '',
      columnDef: 'publish',
      isSortable: false,
      cell: (element: Record<string, any>) => `${element['publish']}`,
      cellStyle: {
        'background-color': '#0000000a',
        'color': '#00000099'
      },
      isAction: true,
      hasStyle: true,
    }
  ]  
  instituteTableData = [];

  studentExamsTableHeader = [
    {
      header: 'Full name',
      columnDef: 'studentName',
      isSortable: true,
      cell: (element: Record<string, any>) => `${element['studentName']}`,
      cellStyle: {
        'background-color': '#0000000a',
        'color': '#00000099'
      },
    },{
      header: 'Course name',
      columnDef: 'courseName',
      cell: (element: Record<string, any>) => `${element['courseName']}`,
      cellStyle: {
        'background-color': '#0000000a', 'width': '120px', 'color': '#00000099'
      },
    },{
      header: 'Exam',
      columnDef: 'exams',
      cell: (element: Record<string, any>) => `${element['exams']}`,
      cellStyle: {
        'background-color': '#0000000a', 'width': '120px', 'color': '#00000099'
      },
    },{
      header: 'Internal marks',
      columnDef: 'internalMarks',
      cell: (element: Record<string, any>) => `${element['internalMarks']}`,
      cellStyle: {
        'background-color': '#0000000a', 'width': '120px', 'color': '#00000099'
      },
    }
  ]

  studentExamsTableData(){
    this.isDataLoading = true;
    this.baseService.getStudentResultData$().subscribe({
      next:(res:any)=>{
        this.studentResultData = res
        setTimeout(() => {
          this.isDataLoading = false;
        }, 1000);

      },
      error: (error: HttpErrorResponse) => {
        this.isDataLoading = false;
        console.log(error)
      }

    })  } 
  
  examCycleControl = new FormControl('');
  examControl = new FormControl('');

  // searcControl = '';
  // searchKey = ''
  showInstitutesTable = true

  //#endregion
  breadcrumbItems = [
    { label: 'Manage Results', url: '' },
  ]
  constructor(
    private baseService: BaseService,
    private dialog: MatDialog,

  ) {
   
  }

  ngOnInit(): void {
    this.intialisation()
  }

  intialisation() {
    // this.getExamCycles()
    this.getInstitutesData();
    this.studentExamsTableData();
  }

  getExamCycles() {
    //this.baseService.getExamCycles()
    // .subscribe((examCucles: any) => {
    //   this.examCycleList = examCucles
    // })
  }

  getInstitutesData(searchKey: string = '') {
    this.baseService.getInstitutesResultData$()
     .subscribe((response: any) => {
      console.log(response)
      for (let institute of response) {
        if(institute.internalMarksProvided &&  institute.finalMarksProvided && institute.revisedFinalMarksProvided ){
          institute.publish = "Publish"
        }else{
          institute.publish = "-"
        }
        institute.internalMarksProvided ?  institute.internalMarksProvided = "View & Download" : institute.internalMarksProvided = "Pending"
        institute.finalMarksProvided ?  institute.finalMarksProvided = "View & Delete" : institute.finalMarksProvided = "Upload"
        institute.revisedFinalMarksProvided ?  institute.revisedFinalMarksProvided = "View & Delete" : institute.revisedFinalMarksProvided = "Upload"
     
      
      }
       this.instituteTableData = response
     })
  }

  getExamsOfInstitute(instituteId: string) {
    // .subscribe((examsFeeDetails: any) => {
    //   this.studentExamsTableData = examsFeeDetails
    // })
  }

  // search() {
  //   this.searchKey = this.searcControl
  //   this.showInstitutesTable = true
  // }

  onSelecteInstitute(event: any) {
    if (event) {
      // this.instituteTableData = []
      // this.feeManagementService.getExamsOfInstitute('')
      // .subscribe((exams: any) => {
      //   this.instituteTableData = exams
      // })
    }
    this.showInstitutesTable = false

  }

  onCellClick(event: any) {
    console.log("Cell Data", event);
    switch(event.columnDef) {
      case "internalMarksProvided":
        this.internalMarksHandler(event);
        break;
      case "finalMarksProvided": 
        this.finalMarksHandler(event);
        break;
      case "revisedFinalMarksProvided": 
        this.revisedFinalMarksHandler(event);
        break;
      case "publish":
        this.publishHandler(event);
        break;

    }
  }


  internalMarksHandler(cellDetails: any) {
    if(cellDetails.row.internalMarksProvided === 'View & download'){
      this.showInstitutesTable = false;
      this.selectedCellDetails  = cellDetails;
    }
  }

  finalMarksHandler(cellDetails:any) {
    if(cellDetails.row.finalMarksProvided === 'View & delete'){
      this.showInstitutesTable = false;
      this.selectedCellDetails  = cellDetails;
    } else if(cellDetails.row.finalMarksProvided === 'Upload') {
      this.openUploadModal(cellDetails);
    }

  }

  revisedFinalMarksHandler(cellDetails:any) {
    if(cellDetails.row.revisedFinalMarksProvided === 'Upload') {
      this.openUploadModal(cellDetails);
    }
  }

  openUploadModal(cellDetails: any){
    const heading= cellDetails.columnDef === "finalMarksProvided" ? "Upoad final marks" : "Upload revised marks";
    const dialogRef = this.dialog.open(UploadDialogComponent, {
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
          const dialogRef = this.dialog.open(ConformationDialogComponent, {
            data: {
              dialogType: 'success',
              description: ['Markes uploaded successfully'],
              buttons: [
                {
                  btnText: 'Ok',
                  positionClass: 'center',
                  btnClass: 'btn-full',
                  response: true,
                  // click:this.router.navigateByUrl('/manage-result/institute'),
    
                },
              ],
            },
            width: '700px',
            height: '400px',
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

  publishHandler(cellDetails: any) {
    if(cellDetails.row.publish === 'Publish') {
      this.openPublishConfirmation(cellDetails);;
    }
  }

  openPublishConfirmation(cellDetails: any) {
    const dialogRef = this.dialog.open(ConformationDialogComponent, {
      data: {
        dialogType: 'confirmation',
        header: 'Publish marks ?',
        description: [`Are you sure you want to publish marks of ${cellDetails.row.instituteName} `],
        buttons: [
          {
            btnText: 'Publish',
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
        console.log("Confirmation result", result);
      }
    })
  }

  deleteMarksHander() {

  }

  downloadMarksHandler() {

  }


}
