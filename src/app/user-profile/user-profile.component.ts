import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';
import { BaseService } from '../service/base.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthServiceService } from '../core/services/auth-service/auth-service.service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {
  userForm: FormGroup
  isUsertable: boolean = true;
  optionList: any[] = ['Active', 'Inactive']
  roleList: any[] = ['Institute', 'Candidate', 'Admin']
  editDataObject: any;
  isEditData:boolean = false;
  loggedInRole: string=""

  userObject={
    name: '-',
    enrollmentNumber: this.loggedInRole === "exams_student" ? '' : '-',
    emailId : '-' ,
    phoneNumber : '-',
    role: this.loggedInRole === "exams_student" ? 'Candidate' : 'Institute',
    activeStatus: 'Active',
    address: '-'
  }
  userData: any;

  constructor(private router: Router,
    private _location: Location,
    private authService: AuthServiceService,
    private route: ActivatedRoute,
    private baseService: BaseService) {
    this.userForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      emailId: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
      activeStatus: new FormControl('', Validators.required)
    })

    this.route.params.subscribe(param => {
      this.loggedInRole = param['role'];
    })
  }

  ngOnInit(): void {
    this.userData = this.authService.getUserRepresentation();
    this.baseService.getUserProfileInfo$(this.userData.attributes.studentId[0])
    .subscribe({
      next:(res:any)=>{
       // this.studentData = res.studentsExamDetailsList;
       this.setUserFormData(res.responseData);
      },
      error: (error: HttpErrorResponse) => {
       // this.isDataLoading = false;
        console.log(error)
      }

    })
    
  }

  setUserFormData(data: any) {


    this.userObject.name = data.firstName +" "+data.surname;
    this.userObject.enrollmentNumber= data.enrollmentNumber
    this.userObject.emailId = data.emailId
    this.userObject.phoneNumber =data.mobileNo
    this.userObject.role= this.userData.attributes.Role[0]==='exams_student' ? 'Candidate': '-',
    this.userObject.activeStatus= 'Active'

    this.userForm.patchValue({
      firstName: data.firstName,
      lastName: data.surname,
      emailId:  data.emailId,
      phoneNumber: data.mobileNo,
      role: this.userObject?.role,
      activeStatus: this.userObject?.activeStatus
    })
  }
  

  get firstName() {
    return this.userForm.get('firstName')
  }
  get lastName() {
    return this.userForm.get('lastName')
  }

  get emailId() {
    return this.userForm.get('emailId')
  }

  get phoneNumber() {
    return this.userForm.get('phoneNumber')
  }
  backClicked() {
    this._location.back();
  }

  addUserFn() {
    this.isUsertable = false;
  }
  navigateToHome() {
    this.router.navigate(['home'])
  }

  onClickEdit(){
    this.isEditData = true;
  }

  onClickCancel(){
    this.isEditData = false;
  }

  onSubmit() {
    console.log(this.userForm.value)
  }


}
