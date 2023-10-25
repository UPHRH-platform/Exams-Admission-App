import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap, of } from 'rxjs';
import { BaseService } from 'src/app/service/base.service';
import { ToastrServiceService } from 'src/app/shared/services/toastr/toastr.service';


@Component({
  selector: 'app-manage-result-institute-list',
  templateUrl: './manage-result-institute-list.component.html',
  styleUrls: ['./manage-result-institute-list.component.scss']
})
export class ManageResultInstituteListComponent implements OnInit {
  breadcrumbItems = [
    {label: 'Manage Results', url: ''}
  ]
  examTableHeader = [
    {
      header: 'Full name',
      columnDef: 'fullName',
      cell: (element: Record<string, any>) => `${element['fullName']}`,
      cellStyle: {
        'background-color': '#0000000a',
        'color': '#00000099'
      }
    },{
      header: 'Enrollment number',
      columnDef: 'enrollmentNumber',
      cell: (element: Record<string, any>) => `${element['enrollmentNumber']}`,
      cellStyle: {
        'background-color': '#0000000a', 'width': '135px', 'color': '#00000099'
      }
    },{
      header: 'Course name',
      columnDef: 'courseName',
      cell: (element: Record<string, any>) => `${element['courseName']}`,
      cellStyle: {
        'background-color': '#0000000a', 'width': '135px', 'color': '#00000099'
      }
    },{
      header: 'Exam name',
      columnDef: 'examName',
      cell: (element: Record<string, any>) => `${element['examName']}`,
      cellStyle: {
        'background-color': '#0000000a', 'width': '135px', 'color': '#00000099'
      }
    },
    {
      header: 'Internal marks',
      columnDef: 'internalMarks',
      cell: (element: Record<string, any>) => `${element['internalMarks']}`,
      cellStyle: {
        'background-color': '#0000000a', 'width': '135px', 'color': '#00000099'
      }
    },
  ]
  examTableData: any= [];
  isHallTicket = true;
  
  constructor(
    private router: Router,
    private activatedRoutes: ActivatedRoute,
    private baseService: BaseService,
    private toasterService: ToastrServiceService
  ){}

  ngOnInit(): void {
    this.activatedRoutes.queryParams.subscribe((params: any) => {
      if(params && params.examId) {
        const formBody = {
          examCycle: params.examCycleId,
          exam: params.examId,
          institute: params.instituteId
        }
        this.getInternalMarksOfExam(formBody)
      } else {
        this.goToList()
      }
    })
  }

  getInternalMarksOfExam(examDetails: any) {
    const formBody = examDetails
    this.baseService.getInternalMarksOfExam$(formBody)
    .pipe((mergeMap((res: any) => {
      return this.formateMarksOfExam(res.responseData)
    })))
    .subscribe({
      next: (res) => {
        if(res && res.responseData) {
          this.examTableData = res.responseData
        }
      }
    })
  }

  formateMarksOfExam(examMarks: any) {
    const foramtedMarks: any = []
    if(examMarks.length > 0) {
      examMarks.forEach((element: any) => {
        const studentMarks = {
          fullName: element.lastName + ' ' + element.firstName,
          enrollmentNumber: element.enrolementNumber,
          courseName: element.courseName,
          examName: element.exam,
          internalMarks: element.internalMark
        }
        foramtedMarks.push(studentMarks)
      })
    }
    return of(foramtedMarks)
  }

  goToList() {
    this.router.navigate(['/manage-result/institute'])
  }
}
