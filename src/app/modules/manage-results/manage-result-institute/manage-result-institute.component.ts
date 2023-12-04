import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { mergeMap, of } from 'rxjs';
import { AuthServiceService } from 'src/app/core/services';
import { BaseService } from 'src/app/service/base.service';
import { ToastrServiceService } from 'src/app/shared/services/toastr/toastr.service';

@Component({
  selector: 'app-manage-result-institute',
  templateUrl: './manage-result-institute.component.html',
  styleUrls: ['./manage-result-institute.component.scss']
})
export class ManageResultInstituteComponent implements OnInit {
  @Input() hallTicketDetails: any;
  @Input() examTableHeader: any;
  @Input() examTableData: any;
  @Input() isHallTicket: any;

  cardList: any[] = [];

  examCycleList: any = []

  examCycle = new FormControl('');
  breadcrumbItems = [
    {label: 'Manage Results', url: ''}
  ]
  loggedInUserId: string | number;
  instituteDetail: any;
  noResultMessage = 'Your institution did not have any exams for the selected exam cycle, and as a result, you do not have any exam to upload results. Please reach out to the administration for additional details.';
  isDataLoading = true;

  constructor(
    private router: Router,
    private baseService: BaseService,
    private authService: AuthServiceService,
    private toasterService: ToastrServiceService,
  ) {}

  ngOnInit(): void {
    this.intialisation()
  }

  intialisation() {
    this.loggedInUserId = this.authService.getUserRepresentation().id;
    this.getInstituteByuserId()
    this.getFilters();
  }

  getFilters() {
    const filters = this.baseService.getFilter;
    if (filters && filters.manageResults) {
      this.examCycle.setValue(filters.manageResults.examCycle);
    }
  }

  getInstituteByuserId() {
    this.baseService.getInstituteDetailsByUser(this.loggedInUserId).subscribe({
      next: (res) => {
        this.instituteDetail = res.responseData[0];
        this.getExamCycles()
      }
    })
  }

  getExamCycles() {
    this.baseService.getExamCycleList$()
    .pipe(mergeMap((res: any) => {
      return this.baseService.formatExamCyclesForDropdown(res.responseData)
    }))
    .subscribe((examCucles: any) => {
      this.isDataLoading = false;
      this.examCycleList = examCucles.examCyclesList
      if (!this.examCycle.value) {
        this.examCycle.patchValue(this.examCycleList[this.examCycleList.length - 1].id)
      }
      this.getExamDetails(this.examCycle.value)
    })
  }

  getExamDetails(examCycleId: any) {
    this.setFilters();
    if (this.instituteDetail) {
      this.isDataLoading = true;
      this.cardList = [];
      this.baseService.getExamsByInstitute$(examCycleId, this.instituteDetail.id)
      .pipe(mergeMap((res: any) => {
        return this.formateExamDetails(res.responseData);
      }))
      .subscribe({
        next: (res: any) => {
          this.cardList = res
          this.isDataLoading = false;
        },
        error: (error: HttpErrorResponse) => {
          this.toasterService.showToastr(error, 'Error', 'error', '')
          this.isDataLoading = false;
        }
      })
    }
  }

  setFilters() {
    const filter = {
      manageResults: {
        examCycle: this.examCycle.value
      }
    }
    this.baseService.setFilter(filter);
  }

  formateExamDetails(res: any) {
    const foramtedExamDetails: any = []
    if (res && res.length > 0) {
      res.forEach((element:any) => {
        const formatedExam = {
          examName: element.examName,
          examId: element.examId,
          lastDateToUpload: element.lastDateToUploadInternalMarks,
          marksUploaded: element.internalMarksUploadStatus
        }
        foramtedExamDetails.push(formatedExam)
      })
    }
    return of(foramtedExamDetails)
  }

  navigateToUpload(examId: string) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        instituteId: this.instituteDetail.id,
      },
    }
    this.router.navigate(['/manage-result/institute/upload'], navigationExtras);
  }

  navigateToView(examId: string) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        examId: examId,
        instituteId: this.instituteDetail.id,
        examCycleId: this.examCycle.value,
      },
    }
    this.router.navigate(['/manage-result/institute/list'], navigationExtras);
  }
}
