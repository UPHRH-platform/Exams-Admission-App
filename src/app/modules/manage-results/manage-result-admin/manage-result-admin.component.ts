//#region (imports)
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UploadDialogComponent } from 'src/app/shared/components/upload-dialog/upload-dialog.component';
import { ConformationDialogComponent } from 'src/app/shared/components/conformation-dialog/conformation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

import { BaseService } from '../../../service/base.service';
import { HttpErrorResponse } from '@angular/common/http';
import { mergeMap, of } from 'rxjs';
import { ToastrServiceService } from 'src/app/shared/services/toastr/toastr.service';
//#endregion
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
  //#region (global variables)
  selectedCellDetails: any;
  isDataLoading: boolean = false;
  studentResultData: any[] = [];
  title: string = 'Manage Results'
  showDownloadBtn = false
  showDeleteBtn = false
  showPublishBtn = true


  examCycleList = []

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

  examCycleControl = new FormControl('');

  showInstitutesTable = true

  breadcrumbItems = [
    { label: 'Manage Results', url: '' },
  ]
  studentMarksDetails = [];
  //#endregion
  
  constructor(
    private baseService: BaseService,
    private dialog: MatDialog,
    private toastrService: ToastrServiceService
  ) { 
  }

  ngOnInit(): void {
    this.intialisation()
  }

  //#region (Intialisation)
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
        this.examCycleList = examCycles.examCyclesList
    },
    error: (err: HttpErrorResponse) => {
      this.toastrService.showToastr('Something went wrong. Please try again later', 'Error', 'error', '');
         console.log(err)
    }
  })
  }

  getInstitutesData(examCycleId: any) {
    this.baseService.getInstitutesResultData$(examCycleId)
    .pipe((mergeMap((res) => {
      return this.formateInstitutesData(res.responseData)
    })))
     .subscribe({
        next: (response: any) => {
          this.instituteTableData = response;
      },
      error: (err: HttpErrorResponse) => {
        this.toastrService.showToastr(err, 'Error', 'error', '')
      }
    })
  }

  formateInstitutesData(response: any) {
    const foramtedData: any[] = []
    response.forEach((institute: any) => {
      let formatedInstituteData: {
        instituteName: string,
        instituteId: string,
        course: string,
        internalMarksProvided: string,
        finalMarksProvided: string,
        revisedFinalMarksProvided: string,
        classes: any,
      } = {
        instituteName: institute.instituteName,
        instituteId: institute.instituteId,
        course: institute.course,
        internalMarksProvided: '-',
        finalMarksProvided: '-',
        revisedFinalMarksProvided: '-',
        classes: {}
      }
      if (institute.hasInternalMarks) {
        formatedInstituteData.internalMarksProvided = "View";
        formatedInstituteData['classes']['internalMarksProvided'] = ['color-green'];
      } else {
        formatedInstituteData.internalMarksProvided = "Pending";
        formatedInstituteData['classes']['internalMarksProvided'] = ['color-orange'];
      }
      
      if (institute.hasFinalMarks) {
        formatedInstituteData.finalMarksProvided = "View";
        formatedInstituteData['classes']['finalMarksProvided'] = ['color-green'];
      } else if(formatedInstituteData.internalMarksProvided === "View") {
        formatedInstituteData.finalMarksProvided = "Upload";
        formatedInstituteData['classes']['finalMarksProvided'] = ['color-blue'];
      } else {
        formatedInstituteData.finalMarksProvided = "-";
        formatedInstituteData['classes']['finalMarksProvided'] = ['color-blue'];
      }
      
      if (institute.hasRevisedFinalMarks) {
        formatedInstituteData.revisedFinalMarksProvided = "View";
        formatedInstituteData['classes']['revisedFinalMarksProvided'] = ['color-green'];
      } else if (formatedInstituteData.finalMarksProvided === "View") {
        formatedInstituteData.revisedFinalMarksProvided = "Upload";
        formatedInstituteData['classes']['revisedFinalMarksProvided'] = ['color-blue'];
      } else {
        formatedInstituteData.revisedFinalMarksProvided = "-";
        formatedInstituteData['classes']['revisedFinalMarksProvided'] = ['color-blue'];
      }

      foramtedData.push(formatedInstituteData)
    
    })
    return of(foramtedData)
  }
  //#endregion

  //#region (button clicks)

  //#region (publish)
  openPublishConfirmation() {
    const dialogRef = this.dialog.open(ConformationDialogComponent, {
      data: {
        dialogType: 'confirmation',
        header: 'Publish marks ?',
        description: [`Are you sure you want to publish marks of ${this.title} `],
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
      width: '500px',
      height: '200px',
      maxWidth: '90vw',
      maxHeight: '90vh'
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const formBody = {
          examCycleId: this.examCycleControl.value,
          courseId: 9,
        }
        this.publishResults(formBody)
      }
    })
  }

  publishResults(formBody: any) {
    this.baseService.publishResults$(formBody)
    .subscribe((res: any) => {
      this.showInstituteTable()
    })
  }
  //#endregion

  downloadMarksHandler() {
    const internalMarks = [
      [
        `First Name`, 
        `Last Name`, 
        `Enrolment Number`,
        `Mother's Name`,
        `Father's Name`,
        `Course`,
        `Exam Cycle`,
        `Exam`,
        `Internal Marks`,
        `Passing Internal Marks`,
        `Internal Marks Obtained`,
        `Practical Marks`,
        `Passing Practical Marks`,
        `Practical Marks Obtained`,
        `Other Marks`,
        `Passing Other Marks`,
        `Other Marks Obtained`,
        `External Marks`,
        `Passing External Marks`,
        `External Marks Obtained`,
        `Total Marks`,
        `Passing Total Marks`,
        `Total Marks Obtained`,
        `Grade`,
        `Result`,
      ],
    ];

    if(this.studentMarksDetails.length > 0) {
      this.studentMarksDetails.forEach((element: any) => {
        const stuentMarks = [
          element.firstName,
          element.lastName,
          element.enrollmentNumber,
          element.motherName,
          element.fatherName,
          element.courseValue,
          element.examCycleValue,
          element.examValue,
          element.internalMarks,
          element.passingInternalMarks,
          element.internalMarksObtained,
          element.practicalMarks,
          element.passingPracticalMarks,
          element.practicalMarksObtained,
          element.otherMarks,
          element.passingOtherMarks,
          element.otherMarksObtained,
          element.externalMarks,
          element.passingExternalMarks,
          element.externalMarksObtained,
          element.totalMarks,
          element.passingTotalMarks,
          element.totalMarksObtained,
          element.grade,
          element.result
        ]
        internalMarks.push(stuentMarks)
      });
    }

    // Create a 2D array to hold the Excel data
    const csvContent: any = [];
    internalMarks.forEach((row: any) => {
      csvContent.push(row.join(','));
    });

    // Convert the array to a CSV string
    const csvString = csvContent.join('\n');

    // Create a Blob containing the CSV data
    const blob = new Blob([csvString], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    // Create a download link
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = this.selectedCellDetails.row.instituteName + '.xlsx';

    // Append the download link to the body
    document.body.appendChild(a);

    // Trigger the download
    a.click();

    // Clean up
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    this.showInstituteTable();
  }

  deleteMarksHander() {
    this.isDataLoading = true;
    this.baseService.deleteResults().subscribe({
      next: (res:any) => {
        this.toastrService.showToastr(res.statusInfo.statusMessage, 'Success', 'success', '')
        this.isDataLoading = false;
        this.showInstituteTable()
      },
      error: (err: HttpErrorResponse) => {
        this.toastrService.showToastr(err, 'Error', 'error', '')
        this.isDataLoading = false;
      }
    })

  }
  //#endregion

  showInstituteTable() {
    this.showDeleteBtn = false;
    this.showDownloadBtn = false;
    this.showPublishBtn = true;
    this.title = 'Manage Results';
    this.showInstitutesTable = true;
    this.getInstitutesData(this.examCycleControl.value);
  }

  //#region (cell click action)
  onCellClick(event: any) {
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
    }
  }

  internalMarksHandler(cellDetails: any) {
    if(cellDetails.row.internalMarksProvided === 'View'){
      this.showStudentsTable(cellDetails)
    }
  }

  finalMarksHandler(cellDetails:any) {
    if(cellDetails.row.finalMarksProvided === 'View'){
      this.showStudentsTable(cellDetails);
    } else if(cellDetails.row.finalMarksProvided === 'Upload') {
      this.openUploadModal(cellDetails);
    }
  }

  revisedFinalMarksHandler(cellDetails:any) {
    if(cellDetails.row.revisedFinalMarksProvided === 'Upload') {
      this.openUploadModal(cellDetails);
    } else if (cellDetails.row.revisedFinalMarksProvided === 'View') {
      this.showStudentsTable(cellDetails);
    }
  }

  //#region (show student table)
  showStudentsTable(cellDetails: any) {
    this.title = cellDetails.row.instituteName;
    this.selectedCellDetails = cellDetails;
    this.showPublishBtn = false;
    this.studentExamsTableHeader = [
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
          'background-color': '#0000000a', 'width': '130px', 'color': '#00000099'
        },
      }
    ]
    switch(cellDetails.columnDef) {
      case "internalMarksProvided":
        this.showDownloadBtn = true;
        this.showDeleteBtn = false;
        break;
      case "finalMarksProvided": 
        this.showDeleteBtn = true;
        this.showDownloadBtn = false;
        this.studentExamsTableHeader.push(
        {
          header: 'Final marks',
          columnDef: 'externalMarks',
          cell: (element: Record<string, any>) => `${element['externalMarks']}`,
          cellStyle: {
            'background-color': '#0000000a', 'width': '120px', 'color': '#00000099'
          },
        })
        break;
      case "revisedFinalMarksProvided": 
        this.showDeleteBtn = true;
        this.showDownloadBtn = false;
        this.studentExamsTableHeader.push(
          {
            header: 'Revised final marks',
            columnDef: 'externalMarks',
            cell: (element: Record<string, any>) => `${element['externalMarks']}`,
            cellStyle: {
              'background-color': '#0000000a', 'width': '160px', 'color': '#00000099'
            },
          })
        break;
    }
    this.getStudentExamsTableData()
  }

  getStudentExamsTableData(){
    this.isDataLoading = true;
    this.studentMarksDetails = [];
    this.baseService.getStudentResultData$(this.examCycleControl.value, this.selectedCellDetails.row.instituteId)
    .subscribe({
      next:(res:any)=>{
        this.studentMarksDetails = res.responseData
        this.studentResultData = this.formateStudentsResults(res.responseData)
        this.showInstitutesTable = false;
        setTimeout(() => {
          this.isDataLoading = false;
        }, 1000);

      },
      error: (error: HttpErrorResponse) => {
        this.isDataLoading = false;
        console.log(error)
      }

    })  } 

  formateStudentsResults(result: any) {
    const formatedStudentsData:any = [];
    if(result && result.length > 0) {
      result.forEach((element: any) => {
        const formatedStudentData = {
          studentName: element.lastName + ' ' + element.firstName,
          courseName: element.courseValue,
          exams: element.examValue,
          internalMarks: element.internalMarksObtained,
          externalMarks: element.externalMarks,
          revisedMarks: element.externalMarks
        } 
        formatedStudentsData.push(formatedStudentData)
      })
    }
    return formatedStudentsData;
  }
  //#endregion

  //#region (upload external marks)
  openUploadModal(cellDetails: any){
    const heading= cellDetails.columnDef === "finalMarksProvided" ? "Upoad final marks" : "Upload revised marks";
    const dialogRef = this.dialog.open(UploadDialogComponent, {
    data: {
              heading: heading,     
              labelTwo:'Attach file(s)',
              acceptFiles: '.xlsx',
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
        this.uploadResults(result.files); 
      }
    });
  }

  uploadResults(files: any) {
    const formData = new FormData();
    formData.append(`fileType`, `excel`)
    formData.append("file", files[0], files[0].name);
    this.baseService.uplodeExternalMarks$(formData)
      .subscribe({
        next: (res: any) => {
          this.openConformationDialog()
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        }
      })
  }

  openConformationDialog() {
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
        this.showInstituteTable();
      }
    })
  }
  //#endregion

  //#endregion
}
