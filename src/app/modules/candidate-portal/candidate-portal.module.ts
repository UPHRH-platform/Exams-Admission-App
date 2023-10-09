import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { CandidatePortalRoutingModule } from './candidate-portal-routing.module';
import { CandidatePortalComponent } from './candidate-portal/candidate-portal.component';
import { ExamCycleComponent } from './exam-cycle/exam-cycle.component';
import { ExamHallTicketStudentDetailsComponent } from './exam-hall-ticket-student-details/exam-hall-ticket-student-details.component';
import { HallTicketComponent } from './hall-ticket/hall-ticket.component';
import { ResultsComponent } from './results/results.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared';
import { MaterialModule } from 'src/material/material.module';
import { ModifyHallTicketComponent } from './modify-hall-ticket/modify-hall-ticket.component';
import { EditHallticketComponent } from './edit-hallticket/edit-hallticket.component';
import { CandidatePortalService } from './services/candidate-portal.service';
import { RequestRevalutionComponent } from './request-revalution/request-revalution.component';


@NgModule({
  declarations: [
    CandidatePortalComponent,
    ExamCycleComponent,
    ExamHallTicketStudentDetailsComponent,
    HallTicketComponent,
    ResultsComponent,
    ModifyHallTicketComponent,
    EditHallticketComponent,
    RequestRevalutionComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    CandidatePortalRoutingModule,
  ],
  providers: [
    DatePipe,
    CandidatePortalService,
  ]
})
export class CandidatePortalModule { }
