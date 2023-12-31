import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultDashboardComponent } from './result-dashboard/result-dashboard.component';


const routes: Routes = [
  {
    path:'', component: ResultDashboardComponent, pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
