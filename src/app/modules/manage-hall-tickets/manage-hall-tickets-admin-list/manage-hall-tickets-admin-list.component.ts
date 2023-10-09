import { Component, ViewChild } from '@angular/core';
import { HallTicket, Institute, Course, Year, TableColumn } from '../../../interfaces/interfaces';
import { BaseService } from '../../../service/base.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatTabGroup } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { mergeMap, of } from 'rxjs';
@Component({
  selector: 'app-manage-hall-tickets-admin-list',
  templateUrl: './manage-hall-tickets-admin-list.component.html',
  styleUrls: ['./manage-hall-tickets-admin-list.component.scss']
})
export class ManageHallTicketsAdminListComponent {
  @ViewChild(MatTabGroup) tabGroup: MatTabGroup;

  isDataLoading: boolean = false;

  halltickets: any;
  institutes: Institute[];
  courses: Course[];
  years: Year[];
  hallTicketsData: HallTicket[];
  //generatedHallTickets: HallTicket[];
  pendingHallTicketsTableColumns: TableColumn[] = [];
  generatedHallTicketsTableColumns: TableColumn[] = [];

  filters = ["Attendance > 75", "Attendance < 75"]
  breadcrumbItems = [
    { label: 'Manage Hall Tickets', url: '' },
  ]
  constructor(
    private baseService: BaseService,
    private router: Router,
  ) {

  }
  ngOnInit(): void {

    this.initializeTableColumns();
    this.initializePageData();
    this.getHallTickets();
    //this.getGeneratedHallTickets();
  }


  hallTicketControl = new FormControl('',[Validators.required]);
  courseControl = new FormControl('',[Validators.required]);
  examCycleControl = new FormControl('',[Validators.required]);
  instituteControl = new FormControl('',[Validators.required]);
  
  initializeTableColumns(): void {

    this.pendingHallTicketsTableColumns = [
      {
        columnDef: 'select',
        header: '',
        isSortable: false,
        isCheckBox: true,
        cell: (element: Record<string, any>) => ``,
        cellStyle: {
          'background-color': '#0000000a', 'width': '160px', 'color': '#00000099'
        },
      },
      {
        columnDef: 'firstName',
        header: 'Student Name',
        isSortable: true,
        cell: (element: Record<string, any>) => `${element['firstName']}`,
        cellStyle: {
          'background-color': '#0000000a', 'width': '160px', 'color': '#00000099'
        },
      },
      {
        columnDef: 'courseName',
        header: 'Course Name',
        isSortable: true,
        cell: (element: Record<string, any>) => `${element['courseName']}`,
        cellStyle: {
          'background-color': '#0000000a', 'width': '160px', 'color': '#00000099'
        },
        /*   cell: (element: Record<string, any>) => {
            const timestamp = element['createdAt'];
            const date = new Date(timestamp);
            const month = this.monthNames[date.getMonth()];
            const day = date.getDate();
            const year = date.getFullYear();
            return `${month} ${day}, ${year}`;
          } */
      },
      {
        columnDef: 'studentEnrollmentNumber',
        header: 'Roll Number',
        isSortable: true,
        cell: (element: Record<string, any>) => `${element['studentEnrollmentNumber']}`,
        cellStyle: {
          'background-color': '#0000000a', 'width': '160px', 'color': '#00000099'
        },

      },
      {
        columnDef: 'attendancePercentage',
        header: 'Attendance (%)',
        isSortable: false,
        isLink: true,
        cell: (element: Record<string, any>) => `${element['attendancePercentage']}`,
        cellStyle: {
          'background-color': '#0000000a', 'width': '160px', 'color': '#00000099'
        },
      },
      {
        columnDef: 'feesPaid',
        header: '',
        isSortable: false,
        isLink: true,
        cell: (element: Record<string, any>) => {
          if (element['feesPaid']) {
            return 'PAID'
          } else {
            return 'NOT PAID'
          }
        },
        cellStyle: {
          'background-color': '#0000000a', 'width': '145px', 'color': '#00000099'
        },
      },
      {
        columnDef: 'viewHallTicket',
        header: '',
        isSortable: false,
        isLink: true,
        isAction: true,
        cell: (element: Record<string, any>) => `View`,
        cellStyle: {
            'background-color': '#0000000a', 'width': '145px', 'color': '#0074B6'
          },
          
        
      }

    ];

    this.generatedHallTicketsTableColumns = [
      {
        columnDef: 'studentName',
        header: 'Student Name',
        isSortable: true,
        cell: (element: Record<string, any>) => `${element['studentName']}`,
        cellStyle: {
          'background-color': '#0000000a', 'width': '180px', 'color': '#00000099'
        },
      },
      {
        columnDef: 'courseName',
        header: 'Course Name',
        isSortable: true,
        cell: (element: Record<string, any>) => `${element['courseName']}`,
        cellStyle: {
          'background-color': '#0000000a', 'width': '200px', 'color': '#00000099'
        },
        /*   cell: (element: Record<string, any>) => {
            const timestamp = element['createdAt'];
            const date = new Date(timestamp);
            const month = this.monthNames[date.getMonth()];
            const day = date.getDate();
            const year = date.getFullYear();
            return `${month} ${day}, ${year}`;
          } */
      },
      {
        columnDef: 'rollNo',
        header: 'Roll Number',
        isSortable: true,
        cell: (element: Record<string, any>) => `${element['rollNo']}`,
        cellStyle: {
          'background-color': '#0000000a', 'width': '200px', 'color': '#00000099'
        },

      },
      {
        columnDef: 'attendancePercentage',
        header: 'Attendance(%)',
        isSortable: false,
        isLink: true,
        cell: (element: Record<string, any>) => `${element['attendancePercentage']}`,
        cellStyle: {
          'background-color': '#0000000a', 'width': '160px', 'color': '#00000099'
        },
      },
      {
        columnDef: 'viewHallTicket',
        header: '',
        isSortable: false,
        isLink: true,
        isAction: true,
        cell: (element: Record<string, any>) => `View`,
        cellStyle: {
          'background-color': '#0000000a', 'width': '180px', 'color': '#00000099'
        },
      }

    ];

  }

  getHallTickets() {
    let unformattedResponse : HallTicket[];
    this.isDataLoading = true;
    this.baseService.getHallTickets$()
    .pipe((mergeMap((response: any) => {
      unformattedResponse = response.responseData;
      return this.formateHallTicketsData(response.responseData)
    })))
    .subscribe({
      next: (res: any) => {
        console.log(res)
        this.hallTicketsData = res.hallTicketsDetailsList;
        this.isDataLoading = false;

        this.baseService.setHallTicketData$(unformattedResponse)
      },
      error: (error: HttpErrorResponse) => {
        this.isDataLoading = false;
        console.log(error)
      }

    })

  }

  formateHallTicketsData(response: any) {
    const formatedHallTicketsDetails: {
      hallTicketsDetailsList: any[]
    } = {
      hallTicketsDetailsList: []
    }

    if(response) {
      response.forEach((hallTicketsDetails: any) => {
        const formatedHallTicketDetails = {
          id: hallTicketsDetails.id,
          firstName: hallTicketsDetails.firstName + hallTicketsDetails.lastName,
          courseName: hallTicketsDetails.courseName,
          studentEnrollmentNumber: hallTicketsDetails.studentEnrollmentNumber,
          feesPaid: hallTicketsDetails.feesPaid,
          attendancePercentage: hallTicketsDetails.attendancePercentage,
          hasStyle: true,
          cellStyle: {
            viewHallTicket: {
              'color': '#0074B6'
            }
          }
        }

        formatedHallTicketsDetails.hallTicketsDetailsList.push(formatedHallTicketDetails)
      })
    }
    return of(formatedHallTicketsDetails);
  }

  initializePageData() {
    this.halltickets = [
      {
        value: 'new_hall_ticket', viewValue: "New Hall Tikcet"
      },
      {
        value: 'modification_hall_ticket', viewValue: "Modification Hall Ticket"

      }
    ]
    this.institutes = [
      {
        value: 'abc institute', viewValue: "ABC , Institute"
      },
      {
        value: 'xyz institute', viewValue: "XYZ , Institute"

      }
    ]

 this.getCoursesList();
 this.getExamCycleList();
  
  }

  getExamCycleList(){
    this.baseService.getExamCycleList$().subscribe({
      next: (res: any) => {
          this.isDataLoading = false;
        this.years = res.responseData
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message)
      }
    })
  }

  getCoursesList(){
    this.baseService.getAllCourses$().subscribe({
      next: (res: any) => {
          this.isDataLoading = false;
        this.courses = res.responseData;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message)
      }
    })
  }

  onSelectedRows(value: any) {
    console.log(value)
  }

  generateHallTkt() {
    this.isDataLoading = true;
    let a = this.courseControl?.value;
    let b = this.examCycleControl?.value;
    this.baseService.generateHallTkt$().subscribe({
      next: (res: any) => {
        setTimeout(() => {
          this.isDataLoading = false;
        }, 1000);
        this.tabGroup.selectedIndex = 1;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message)
      }
    })

  }

  onAttendanceFilterClick(e: any) {
    console.log(e)
  }

  onViewClick(event: any)  {
    let r = event.row
    this.router.navigate(['/hall-ticket-management/ticket-details', r.id]);
  }
}
