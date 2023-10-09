import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-result-institute',
  templateUrl: './manage-result-institute.component.html',
  styleUrls: ['./manage-result-institute.component.scss']
})
export class ManageResultInstituteComponent {
  @Input() hallTicketDetails: any;
  @Input() examTableHeader: any;
  @Input() examTableData: any;
  @Input() isHallTicket: any;

  cardList: any[] = [
    {
      title: 'Exam 1',
      lable: 'Last date for Upload',
      date: '25 Mar 2023',
      status: 'Pending',
      navigateUrlSecond: '/manage-result/institute/upload',
    }, {
      title: 'Exam 2',
      lable: 'Last date for Upload',
      date: '25 Mar 2023',
      status: 'Uploaded',
      navigateUrl: '/manage-result/institute/list',
      navigateUrlSecond: '/manage-result/institute/upload',

    },
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

  examCycle = new FormControl('');
  breadcrumbItems = [
    {label: 'Manage Results', url: ''}
  ]
  constructor(
    private router: Router,
    // private candidatePortalService: CandidatePortalService
  ) {}

  ngOnInit(): void {
    this.intialisation()
  }

  intialisation() {
    this.getExamCycles()
  }

  getExamCycles() {
    // this.candidatePortalService.getExamCycles()
    // .pipe(mergeMap((res: any) => {
    //   return this.formateExamCycleDetails(res)
    // })).subscribe((examDetails: any)) {
    // }
  }

  // formateExamCycleDetails(examData: any) {
  //   let formatedData = examData
  //   return formatedData;
  // }

  navigateToView(navigateUrl: string) {
    this.router.navigateByUrl(navigateUrl)
  }
}
