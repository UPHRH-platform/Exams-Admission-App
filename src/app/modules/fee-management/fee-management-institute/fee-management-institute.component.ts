import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/core/services';
import { BaseService } from 'src/app/service/base.service';
import { ToastrServiceService } from 'src/app/shared/services/toastr/toastr.service';

@Component({
  selector: 'app-fee-management-institute',
  templateUrl: './fee-management-institute.component.html',
  styleUrls: ['./fee-management-institute.component.scss']
})
export class FeeManagementInstituteComponent {
  examName: string;
  examCycle: string;
  examCycleList:any[] = [];
  examCycleControl = new FormControl()
  examCycleData: any[] = [
 /*    {
      title: 'Exam schedule 1',
      type: 'Last date of payment: dd/mm/yyyy',
      examId: 1,
    },
    {
      title: 'Exam schedule 2',
      type: 'Last date of payment: dd/mm/yyyy',
      examId: 2,
    },

    {
      title: 'Exam schedule 3',
      type: 'Last date of payment: dd/mm/yyyy',
      examId: 3,
    } */
  ];
  breadcrumbItems = [
    { label: 'Fee Management', url: '' },
  ]
  constructor(
    private router: Router, private authService: AuthServiceService,
    private baseService: BaseService,
    private toasterService: ToastrServiceService
  ) {}

  reDirectToFeemanagement(e: any) {
     // this.router.navigateByUrl('/fee-management/manage-fee');
     console.log(e)
      this.router.navigate(['/fee-management/manage-fee/' + e.id])
  }
    
  ngOnInit() {
    // Check if the user is already logged in
    if (this.authService.isLoggedIn()) {
      // Redirect to the home page if logged in
      console.log("User is logged in !!")

     this.getExamCycles()
     this.getExamCycleData();
    }
  }

  

  getExamCycles() {
    this.baseService.getExamCycleList$().subscribe({
    next: (res) => {
      this.examCycleData = res.responseData.reverse();
    },
    error: (error: HttpErrorResponse) => {
      console.log(error);
    }
  })
  }

  
  getExamCycleData() {
    // this.isDataLoading = true;
    this.baseService.getExamCycleList$().subscribe({
    next: (res) => {
      // this.isDataLoading = false;
      this.examCycleList = res.responseData;
      if (!this.examCycleControl.value) {
        this.examCycleControl.setValue(this.examCycleList[this.examCycleList.length-1].id)
      }
      this.examCycle= this.examCycleControl.value;
      // this.getQuestionPapersByExamCycle()
 
    },
    error: (error: HttpErrorResponse) => {
      console.log(error);
      this.examCycleList = [];
      this.toasterService.showToastr('Something went wrong. Please try later.', 'Error', 'error', '');
    }
  })
  }

  onExamCycleChange(e : any){

  }

}
