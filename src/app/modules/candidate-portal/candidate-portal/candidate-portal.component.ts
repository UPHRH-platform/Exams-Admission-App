import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CandidatePortalService } from '../services/candidate-portal.service';

@Component({
  selector: 'app-candidate-portal',
  templateUrl: './candidate-portal.component.html',
  styleUrls: ['./candidate-portal.component.scss']
})
export class CandidatePortalComponent implements OnInit {
  cardList: any[] = [
    {
      title: 'Hall Ticket',
      lable: 'Generated on',
      date: '25 Mar 2023',
      status: 'Generated',
      navigateUrl: '/candidate-portal/view-hallticket',
    }, {
      title: 'Results',
      lable: 'Published on',
      date: '25 Mar 2023',
      status: 'Published',
      navigateUrl: '/candidate-portal/view-results',
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

  examCycle = new FormControl('',[Validators.required]);

  constructor(
    private router: Router,
    private candidatePortalService: CandidatePortalService
  ) {}

  ngOnInit(): void {
    this.intialisation()
  }

  intialisation() {
    this.getExamCycles()
  }

  getExamCycles() {
    this.candidatePortalService.getExamCycles()
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
