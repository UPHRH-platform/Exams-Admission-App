import { Component, ViewChild } from '@angular/core';
import { HallTicket, Institute, Course, Year, TableColumn } from '../../../interfaces/interfaces';
import { BaseService } from '../../../service/base.service';
import { ToastrServiceService } from 'src/app/shared/services/toastr/toastr.service';
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
  selectedCandidatesForHallTicketsGenerate: HallTicket[];
  pendingHallTicketsTableColumns: TableColumn[] = [];
  generatedHallTicketsTableColumns: TableColumn[] = [];

  filters = ["Attendance > 75", "Attendance < 75"]
  breadcrumbItems = [
    { label: 'Manage Hall Tickets', url: '' },
  ]
  constructor(
    private baseService: BaseService,
    private router: Router,
    private toasterService: ToastrServiceService,
  ) {

  }
  ngOnInit(): void {

    this.initializeTableColumns();
    this.initializePageData();
    this.getHallTickets();
    //this.getGeneratedHallTickets();
  }


  hallTicketControl = new FormControl('', [Validators.required]);
  courseControl = new FormControl('', [Validators.required]);
  examCycleControl = new FormControl('', [Validators.required]);
  instituteControl = new FormControl('', [Validators.required]);

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
        classes: ['color-green'],
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
        columnDef: 'firstName',
        header: 'Student Name',
        isSortable: true,
        cell: (element: Record<string, any>) => `${element['firstName']}`,
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
        columnDef: 'studentEnrollmentNumber',
        header: 'Roll Number',
        isSortable: true,
        cell: (element: Record<string, any>) => `${element['studentEnrollmentNumber']}`,
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
    let unformattedResponse: HallTicket[];
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

    if (response) {
      response.forEach((hallTicketsDetails: any) => {
        const formatedHallTicketDetails = {
          id: hallTicketsDetails.id,
          firstName: hallTicketsDetails.firstName + hallTicketsDetails.lastName,
          courseName: hallTicketsDetails.courseName,
          studentEnrollmentNumber: hallTicketsDetails.studentEnrollmentNumber,
          feesPaid: hallTicketsDetails.feesPaid,
          attendancePercentage: hallTicketsDetails.attendancePercentage,
          classes: {
            viewHallTicket: ['color-blue']
          }
        }

        formatedHallTicketsDetails.hallTicketsDetailsList.push(formatedHallTicketDetails)
      })
    }
    return of(formatedHallTicketsDetails);
  }

  getAllInstitutes() {
     this.baseService.getAllInstitutes$().subscribe({
      next: (res: any) => {
        this.institutes = res.responseData;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message)
      }
    })
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

    this.getAllInstitutes();
    this.getCoursesList();
    this.getExamCycleList();

  }

  getExamCycleList() {
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

  getCoursesList() {
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
    this.selectedCandidatesForHallTicketsGenerate = value;
  }

  generateHallTkt() {
    let a = this.courseControl?.value;
    let b = this.examCycleControl?.value;
    let idsArray: any = []
    this.selectedCandidatesForHallTicketsGenerate.forEach(element => {
      idsArray.push(element.id)
    });
    this.baseService.generateHallTkt$(idsArray).subscribe({
      next: (res: any) => {
        this.toasterService.showToastr('Hall tickets generated successfully for selected candidates !!', 'Success', 'success', '');
        this.tabGroup.selectedIndex = 1;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message)
        this.toasterService.showToastr('Something went wrong. Please try again', 'Error', 'error', '');
      }
    })

  }

  onAttendanceFilterClick(e: any) {
    console.log(e)
  }

  onViewClick(event: any) {
    let r = event.row
    this.router.navigate(['/hall-ticket-management/ticket-details', r.id]);
  }
}
