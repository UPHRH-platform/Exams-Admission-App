import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidatePortalComponent } from './candidate-portal/candidate-portal.component';
import { ResultsComponent } from './results/results.component';
import { HallTicketComponent } from './hall-ticket/hall-ticket.component';
import { ModifyHallTicketComponent } from './modify-hall-ticket/modify-hall-ticket.component';
import { RequestRevalutionComponent } from './request-revalution/request-revalution.component';
import { StudentGuard } from 'src/app/core/guards/role-guard/role.guard';

const routes: Routes = [
  { path: '', component: CandidatePortalComponent },
  { path: 'view-hallticket', component: HallTicketComponent },
  { path: 'modify-hallticket', component: ModifyHallTicketComponent},
  { path: 'view-results', component:  ResultsComponent},
  { path: 'request-revalution', component:  RequestRevalutionComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class CandidatePortalRoutingModule { }
