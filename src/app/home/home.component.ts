import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../core/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  loggedInUserRole: string;
  constructor(private router: Router, private authService: AuthServiceService){}
  cardList: any[] = [
    {
      title: 'User Management',
      type: 'user-management',
      url: '/user-management',
      visibility: 'exams_superadmin'
    },
    {
      title: 'Student Enrollment',
      type: 'student-enrollment-admin',
      url: '/student-enrollment/admin',
      visibility: 'exams_admin'
    },
    {
      title: 'Student Enrollment',
      type: 'student-enrollment-institute',
      url: '/student-enrollment/institute',
      visibility: 'exams_institute'
    },
    {
      title: 'Manage Exam Cycles & Exams',
      type: 'manageCycle',
      url: '/manage-exam-cycle',
      visibility: 'exams_admin',
    },
    {
      title: 'Fee Management',
      type: 'feeManagementAdmin',
      url: '/fee-management/admin',
      visibility: 'exams_admin'
    },
    {
      title: 'Update CCTV Verification Status',
      type: 'cctvVerification',
      url: '/cctv-management',
      visibility: 'exams_admin'
    },
    {
      title: 'Manage Hall Tickets',
      type: 'hallTickets',
      url: '/hall-ticket-management',
      visibility: 'exams_admin'
    },
    {
      title: 'Manage Question Papers',
      type: 'manageQp',
      url: 'manage-question-papers',
      visibility: 'exams_admin' // has to be added for both admin and institute
    },
    {
      title: 'Track Dispatches',
      type: 'trackDispatches',
      url: '/dispatches/track',
      visibility: 'exams_admin'
    },
    {
      title: 'Manage Result',
      type: 'manage-Result-admin',
      url: '/manage-result/admin',
      visibility: 'exams_admin'       // has to be added for both admin and institute

    },
    {
      title: 'Student Registration',
      type: 'student-registration',
      url: '/student-registration',
      visibility: 'exams_student',
    },
    {
      title: 'Register Student to Exam Cycles and Exams',
      type: 'registerStudentInstitute',
      url: '/student-registration/institute',
      visibility: 'exams_institute'
    },
    
    {
      title: 'Fee Management',
      type: 'feeManagementInstitute',
      url: '/fee-management/institute',
      visibility: 'exams_institute'
    },
    
    {
      title: 'Manage Attendance',
      type: 'manageAttendance',
      url: '/manage-attendance',
      visibility: 'exams_institute' // has to be added for both admin and institute
    },
    {
      title: 'Download Question Papers',
      type: 'downloadQuestionPapers',
      url: 'manage-question-papers/institute',
      visibility: 'exams_institute'
    },
    
    {
      title: 'Update Dispatches',
      type: 'updateDispatches',
      url: '/dispatches/update',
      visibility: 'exams_institute'
    },
    
    {
      title: 'Manage Result',
      type: 'manage-Result-Institute',
      url: '/manage-result/institute',
      visibility: 'exams_institute' // has to be added for both admin and institute
    },
    
    {
      title: 'Result Dashboard',
      type: 'resultDashboard',
      url: '/dashboard',
      visibility: 'exams_admin'
    },
    {
      title: 'Student Enrollment',
      type: 'student-enrollment-secretary',
      url: '/student-enrollment/secretary',
      visibility: 'exams_secretary'
    },
    
   
    
    
  ];

  ngOnInit() {
    this.loggedInUserRole = this.authService.getUserRoles()[0];
  }

  navigateTo(item: any) {
    this.router.navigate([item.url]);
  }
}
