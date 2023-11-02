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
      columnDef: 'firstName',
        cell: (element: Record<string, any>) => `${element['firstName']} ${element['lastName']}`,
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
      columnDef: 'exam',
      cell: (element: Record<string, any>) => `${element['exam']}`,
      cellStyle: {
        'background-color': '#0000000a', 'width': '135px', 'color': '#00000099'
      }
    },
    {
      header: 'Internal marks',
      columnDef: 'internalMark',
      cell: (element: Record<string, any>) => `${element['internalMark']}`,
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
          examCycleId: params.examCycleId,
          examId: params.examId,
          instituteId: params.instituteId
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
    .subscribe({
      next: (res) => {
        if(res && res.responseData) {
          this.examTableData = res.responseData
        }
      }
    })
  }


  goToList() {
    this.router.navigate(['/manage-result/institute'])
  }
}
