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
  examCyclesList = [];
  generatedHallTicketsData: HallTicket[] = [];
  pendingHallTicketsData: HallTicket[] = [];
  selectedCandidatesForHallTicketsGenerate: HallTicket[] = [];
  pendingHallTicketsTableColumns: TableColumn[] = [];
  generatedHallTicketsTableColumns: TableColumn[] = [];

  filters = ["Attendance > 75", "Attendance < 75"]
  breadcrumbItems = [
    { label: 'Manage Hall Tickets', url: '' },
  ]
  unformattedHallTickets: any;
  hallTktType: any;
  filtersNotSet = true;

  constructor(
    private baseService: BaseService,
    private router: Router,
    private toasterService: ToastrServiceService,
  ) {

  }
  ngOnInit(): void {

    this.initializeTableColumns();
    this.initializePageData();
    this.getFilters()

    //this.getGeneratedHallTickets();
  }

  getFilters() {
    const filters = this.baseService.getFilter;
    if (filters && filters.manageHallTickets) {
      this.hallTicketControl.setValue(filters.manageHallTickets.hallTicket);
      this.courseControl.setValue(filters.manageHallTickets.course);
      this.examCycleControl.setValue(filters.manageHallTickets.examCycle);
      this.instituteControl.setValue(filters.manageHallTickets.institute);
      this.filtersNotSet = false;
    }
  }

  setFilters() {
    const filter = {
      manageHallTickets: {
        hallTicket: this.hallTicketControl.value,
        course: this.courseControl.value,
        examCycle: this.examCycleControl.value,
        institute: this.instituteControl.value
      }
    }
    this.baseService.setFilter(filter);
    this.filtersNotSet = false;
  }


  hallTicketControl = new FormControl('');
  courseControl = new FormControl();
  examCycleControl = new FormControl();
  instituteControl = new FormControl();

  initializeTableColumns(): void {

    if (this.hallTktType  !== 'modification_hall_ticket') {
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
            'background-color': '#0000000a', 'width': '200px', 'color': '#00000099'
          },
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
          }
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
          }
        }
      ];

      this.generatedHallTicketsTableColumns = [
        {
          columnDef: 'firstName',
          header: 'Student Name',
          isSortable: true,
          cell: (element: Record<string, any>) => `${element['firstName']}`,
          cellStyle: {
            'background-color': '#0000000a', 'width': '200px', 'color': '#00000099'
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
    } else {
      this.pendingHallTicketsTableColumns = [
        {
          columnDef: 'select',
          header: '',
          isSortable: false,
          isCheckBox: true,
          cell: (element: Record<string, any>) => ``,
          cellStyle: {
            'background-color': '#0000000a', 'color': '#00000099'
          },
        },
        {
          columnDef: 'firstName',
          header: 'Student Name',
          isSortable: true,
          cell: (element: Record<string, any>) => `${element['firstName']}`,
          cellStyle: {
            'background-color': '#0000000a', 'color': '#00000099'
          },
        },
        {
          columnDef: 'studentEnrollmentNumber',
          header: 'Roll Number',
          isSortable: true,
          cell: (element: Record<string, any>) => `${element['studentEnrollmentNumber']}`,
          cellStyle: {
            'background-color': '#0000000a', 'color': '#00000099'
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
            'background-color': '#0000000a', 'color': '#0074B6'
          }
        }
      ];

      this.generatedHallTicketsTableColumns = [
        {
          columnDef: 'firstName',
          header: 'Student Name',
          isSortable: true,
          cell: (element: Record<string, any>) => `${element['firstName']}`,
          cellStyle: {
            'background-color': '#0000000a', 'color': '#00000099'
          },
        },
        {
          columnDef: 'studentEnrollmentNumber',
          header: 'Roll Number',
          isSortable: true,
          cell: (element: Record<string, any>) => `${element['studentEnrollmentNumber']}`,
          cellStyle: {
            'background-color': '#0000000a', 'color': '#00000099'
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
            'background-color': '#0000000a', 'color': '#00000099'
          },
        }
  
      ];
    }

  }

  getHallTickets(courseId?: number, examCycleId?: number, instituteId?: number) {
    this.isDataLoading = true;
    this.pendingHallTicketsData = []
    this.generatedHallTicketsData = []
    const that = this
    this.baseService.getHallTickets$(courseId, examCycleId, instituteId)
      .pipe((mergeMap((response: any) => {
        that.unformattedHallTickets = response.responseData;
        return this.formateHallTicketsData(response.responseData)
      })))
      .subscribe({
        next: (res: any) => {
          //console.log(res)
          this.pendingHallTicketsData = res.hallTicketsDetailsList.reverse().filter((hallTicket: { hallTicketStatus: string; }) => (hallTicket.hallTicketStatus != 'GENERATED'));
          this.generatedHallTicketsData = res.hallTicketsDetailsList.reverse().filter((hallTicket: { hallTicketStatus: string; }) => (hallTicket.hallTicketStatus === 'GENERATED'));

          this.isDataLoading = false;
        },
        error: (error: HttpErrorResponse) => {
          this.isDataLoading = false;
          console.log(error)
          this.toasterService.showToastr('No Data found for this filter', 'Error', 'error', '');
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
        if (hallTicketsDetails.feesPaid !== false) {
          const formatedHallTicketDetails = {
            id: hallTicketsDetails.id,
            firstName: hallTicketsDetails.firstName + hallTicketsDetails.lastName,
            courseName: hallTicketsDetails.courseName,
            studentEnrollmentNumber: hallTicketsDetails.studentEnrollmentNumber ? hallTicketsDetails.studentEnrollmentNumber : hallTicketsDetails.enrollmentNumber,
            feesPaid: hallTicketsDetails.feesPaid,
            attendancePercentage: hallTicketsDetails.attendancePercentage,
            hallTicketStatus: hallTicketsDetails.hallTicketStatus,
            classes: {
              viewHallTicket: ['color-blue'],
              attendancePercentage: hallTicketsDetails.attendancePercentage >= 75 ? ['color-green'] : ['color-red'],
            }
          }

          formatedHallTicketsDetails.hallTicketsDetailsList.push(formatedHallTicketDetails)
        }
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
        this.toasterService.showToastr('Something went wrong. Please try again later', 'Error', 'error', '');
        console.log(error.message)
      }
    })
  }

  onSelectionChangeHallTicketType(e: any) {
    this.setFilters();
    console.log(e)
    let courseId: any
    let examCycleId:any
    let instituteId: any

    if (this?.courseControl?.value) {
      courseId = this?.courseControl?.value
    }
    if (this?.examCycleControl?.value) {
      examCycleId = this?.examCycleControl?.value
    }
    if (this?.instituteControl?.value) {
      instituteId = this?.instituteControl?.value
    }
    this.hallTktType = e.value
    this.hallTktType  === 'modification_hall_ticket' ? this.getHallTicketsForDataCorrections(courseId, examCycleId, instituteId) : this.getHallTickets(courseId, examCycleId, instituteId);
    this.initializeTableColumns()

  }
  
  getHallTicketsForDataCorrections(courseId?: number,examCycleId?: number, instituteId?: number) {
    this.isDataLoading = true;
     //console.log(res)
     this.pendingHallTicketsData=[]
     this.generatedHallTicketsData=[]
     const that = this
    this.baseService.getHallTicketsForDataCorrections$(courseId,examCycleId,instituteId)
      .pipe((mergeMap((response: any) => {
        that.unformattedHallTickets = response.responseData;
        return this.formateHallTicketsData(response.responseData.reverse())
      })))
      .subscribe({
        next: (res: any) => {
          //console.log(res)
          this.pendingHallTicketsData = res.hallTicketsDetailsList.reverse().filter((hallTicket: { status: string; }) => (hallTicket.status === 'NEW'));
          this.generatedHallTicketsData = res.hallTicketsDetailsList.reverse().filter((hallTicket: { status: string; }) => (hallTicket.status !== 'NEW'));

          this.isDataLoading = false;
        },
        error: (error: HttpErrorResponse) => {
          this.isDataLoading = false;
          console.log(error)
        }

      })
  }

  initializePageData() {
    this.halltickets = [
      {
        value: 'new_hall_ticket', viewValue: "New Hall Ticket"
      },
      {
        value: 'modification_hall_ticket', viewValue: "Modification Hall Ticket"

      }
    ]
    if (this.filtersNotSet && !this.hallTicketControl.value) {
      this.hallTicketControl.patchValue('new_hall_ticket');
    }

    this.getAllInstitutes();
    this.getCoursesList();
    this.getExamCycleList();
  }

  getOtherSelectedFilters() {
    const selectedFiltersArray = []
    selectedFiltersArray.push({
      instituteId: this.instituteControl.value,
      examCycleId: this.examCycleControl.value,
      courseId: this.courseControl.value
    })

    return selectedFiltersArray;
  }

  onCourseChangeSelected(e: any) {
    this.setFilters();
    const selectedFilters: any = this.getOtherSelectedFilters();
    this.hallTktType  === 'modification_hall_ticket' ? this.getHallTicketsForDataCorrections(e.value, selectedFilters[0].examCycleId, selectedFilters[0].instituteId) :   this.getHallTickets(e.value, selectedFilters[0].examCycleId, selectedFilters[0].instituteId)
  }

  onExamcycleSelected(e: any) {
    this.setFilters();
    const selectedFilters: any = this.getOtherSelectedFilters();
    this.hallTktType  === 'modification_hall_ticket' ? this.getHallTicketsForDataCorrections(selectedFilters[0].courseId, e, selectedFilters[0].instituteId) :  this.getHallTickets(selectedFilters[0].courseId, e, selectedFilters[0].instituteId)
   
  }

  onInstituteSelected(e: any) {
    this.setFilters();
    const selectedFilters: any = this.getOtherSelectedFilters();
    this.hallTktType  === 'modification_hall_ticket' ? this.getHallTicketsForDataCorrections(selectedFilters[0].courseId, selectedFilters[0].examCycleId, e.value) :  this.getHallTickets(selectedFilters[0].courseId, selectedFilters[0].examCycleId, e.value)
   
  }

  getExamCycleList() {
    this.baseService.getExamCycleList$().subscribe({
      next: (res: any) => {
        this.isDataLoading = false;
        this.examCyclesList = res.responseData;
        if (this.filtersNotSet && ! this.examCycleControl.value) {
          this.examCycleControl.patchValue(this.examCyclesList[this.examCyclesList.length - 1]['id']);
        }
        this.getHallTickets(undefined, this.examCyclesList[this.examCyclesList.length - 1]['id'])
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
    let idsArray: any = []

    if (this.selectedCandidatesForHallTicketsGenerate && this.selectedCandidatesForHallTicketsGenerate.length != 0) {
      this.selectedCandidatesForHallTicketsGenerate.forEach(element => {
        idsArray.push(element.id)
      });

      this.baseService.generateHallTkt$(idsArray).subscribe({
        next: (res: any) => {
          this.toasterService.showToastr('Hall tickets generated successfully for selected candidates !!', 'Success', 'success', '');
          this.tabGroup.selectedIndex = 1;
          this.getHallTickets(this.courseControl.value, this.examCycleControl.value, this.instituteControl.value)
        },
        error: (error: HttpErrorResponse) => {
          console.log(error.message)
          this.toasterService.showToastr('Something went wrong. Please try again', 'Error', 'error', '');
        }
      })
    } else {
      this.toasterService.showToastr('Please select candidates', 'Error', 'error', '');
    }
  }

  onAttendanceFilterClick(event: any) {
    console.log(event)
    if (this.tabGroup.selectedIndex === 0) {
      if (event.includes(">")) {
        this.pendingHallTicketsData = this.pendingHallTicketsData.reverse().filter((halltkt: any) => halltkt.attendancePercentage >= 75);
      } else {
        this.pendingHallTicketsData = this.pendingHallTicketsData.reverse().filter((halltkt: any) => halltkt.attendancePercentage < 75);
      }
    } else {
      if (event.includes(">")) {
        this.generatedHallTicketsData = this.generatedHallTicketsData.reverse().filter((halltkt: any) => halltkt.attendancePercentage >= 75);

      } else {
        this.generatedHallTicketsData = this.generatedHallTicketsData.reverse().filter((halltkt: any) => halltkt.attendancePercentage < 75);
      }
    }

  }

  onFilterClear() {
    this.hallTktType  === 'modification_hall_ticket' ? this.getHallTicketsForDataCorrections() : this.getHallTickets();
    this.instituteControl.patchValue('')
    this.courseControl.patchValue('')
    this.examCycleControl.patchValue('')
    this.setFilters()
  }

  onViewClick(event: any) {
    const hallTktDetails = this.unformattedHallTickets.filter((hallTicket: { id: string; }) => (hallTicket.id === event.row.id));
    this.router.navigate(['/hall-ticket-management/ticket-details'], { 
      state: { 
        data: hallTktDetails[0],
        requestModification:  this.hallTktType === 'modification_hall_ticket',
      } 
    });
  }
}
