import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageTrackDispatchesComponent } from './manage-track-dispatches/manage-track-dispatches.component';
import { UpdateTrackDispatchesInstituteComponent } from './update-track-dispatches-institute/update-track-dispatches-institute.component';

const routes: Routes = [
  {path: 'track', component: ManageTrackDispatchesComponent},
  {path: 'update', component:   UpdateTrackDispatchesInstituteComponent}

];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class TrackDispatchesRoutingModule { }
