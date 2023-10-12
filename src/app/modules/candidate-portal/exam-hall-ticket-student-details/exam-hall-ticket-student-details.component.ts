import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-exam-hall-ticket-student-details',
  templateUrl: './exam-hall-ticket-student-details.component.html',
  styleUrls: ['./exam-hall-ticket-student-details.component.scss']
})
export class ExamHallTicketStudentDetailsComponent {

  @Input() hallTicketDetails: any;

  constructor() { }

  ngOnInit() {
    if (this.hallTicketDetails) {
      this.hallTicketDetails!.dob = this.reverseDate(this.hallTicketDetails!.dob)
    }
  }

  reverseDate(date: string){
    let Dob = new Date(date);
    return  Dob.getDate() + "-" + `${Dob.getMonth() + 1}` + "-" + Dob.getFullYear()
  
  }

}
