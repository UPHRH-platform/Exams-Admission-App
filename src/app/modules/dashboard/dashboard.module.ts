import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MaterialModule } from 'src/material/material.module';
import { SharedModule } from '../../shared/shared.module';
import { ResultDashboardComponent } from './result-dashboard/result-dashboard.component';



@NgModule({
  declarations: [
    ResultDashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class DashboardModule { }
