import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-exam-hall-ticket-student-details',
  templateUrl: './exam-hall-ticket-student-details.component.html',
  styleUrls: ['./exam-hall-ticket-student-details.component.scss']
})
export class ExamHallTicketStudentDetailsComponent {

  @Input() studentDetails: any;

  constructor() { }



}
