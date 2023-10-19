import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonLayoutComponent } from './shared/components/common-layout/common-layout.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './core/guards/auth-guard/auth.guard';
import { AdminGuard, InstituteGuard, StudentGuard } from './core/guards/role-guard/role.guard';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ManageUserListComponent } from './modules/user-module/manage-user-list/manage-user-list.component';
import { PaymentComponent } from './payment/payment.component';


const routes: Routes = [
  {
    path: '', loadChildren :()=> import('../app/modules/auth-modules/auth-modules.module').then(m=>m.AuthModulesModule)
  },
  {
    path: '',
    component: CommonLayoutComponent,
    children: [
      {
        path: 'home', 
        component: HomeComponent, 
        canActivate: [AuthGuard],
        pathMatch: 'full',
      },
      {
        path: 'dashboard', 
        loadChildren:()=> import('../app/modules/dashboard/dashboard.module').then(m=>m.DashboardModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'student-enrollment',
        loadChildren:()=> import('../app/modules/student-enrollment/student-enrollment.module').then(m=>m.StudentEnrollmentModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'student-registration',
        loadChildren: () => import('../app/modules/student-registration/student-registration.module').then(m=>m.StudentRegistrationModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'fee-management',
        loadChildren: () => import('../app/modules/fee-management/fee-management.module').then(m => m.FeeManagementModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'manage-exam-cycle',
        loadChildren: () => import('../app/modules/manage-exams/manage-exams.module').then(m => m.ManageExamsModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'cctv-management',
        loadChildren: () => import('../app/modules/cctv-verification/cctv-verification.module').then(m => m.CctvVerificationModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'hall-ticket-management',
        loadChildren: () => import('../app/modules/manage-hall-tickets/manage-hall-tickets.module').then(m => m.ManageHallTicketsModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'manage-question-papers',
        loadChildren: () => import('../app/modules/manage-question-papers/manage-question-papers.module').then(m => m.ManageQuestionPapersModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'dispatches',
        loadChildren: () => import('../app/modules/track-dispatches/track-dispatches.module').then(m => m.TrackDispatchesModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'manage-result',
        loadChildren: () => import('../app/modules/manage-results/manage-results.module').then(m => m.ManageResultsModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'candidate-portal',
        loadChildren: () => import('../app/modules/candidate-portal/candidate-portal-routing.module').then(m => m.CandidatePortalRoutingModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'manage-attendance',
        loadChildren: () => import('../app/modules/manage-attendance-record/manage-attendance-record.module').then(m => m.ManageAttendanceRecordModule)
      },
      {
        path: 'user-profile', 
        component: UserProfileComponent, 
        // canActivate: [AuthGuard],
        // data: {
        //   allowedRoles: [Roles.ADMIN, Roles.GRIEVANCE_NODAL, Roles.NODAL_OFFICER, Roles.SECRETARY],
        // },
        pathMatch: 'full',
      },
      {
        path: 'user-management',
        loadChildren: () => import('../app/modules/user-module/user-module-routing.module').then(m => m.UserModuleRoutingModule)
      },
      {
        path: 'user-management', 
        component:  ManageUserListComponent, 
        // canActivate: [AuthGuard],
        // data: {
        //   allowedRoles: [Roles.ADMIN, Roles.GRIEVANCE_NODAL, Roles.NODAL_OFFICER, Roles.SECRETARY],
        // },
        pathMatch: 'full',
      },
      {
        path: 'payment-response', 
        component: PaymentComponent, 
        // canActivate: [AuthGuard],
        // data: {
        //   allowedRoles: [Roles.ADMIN, Roles.GRIEVANCE_NODAL, Roles.NODAL_OFFICER, Roles.SECRETARY],
        // },
      },
      {
        path: "**",
        redirectTo:"/"
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
