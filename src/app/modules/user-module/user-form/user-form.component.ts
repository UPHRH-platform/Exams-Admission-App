import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseService } from 'src/app/service/base.service';



@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {
  userForm: FormGroup;
   
  optionList: any[] = ['Active', 'Inactive']
  roleList: any[] = ['Institute', 'Candidate', 'Admin']
  breadcrumbItems = [
    { label: 'Manage Users', url: '/user-management' },
    { label: 'Create User', url: '' }
  ]


  constructor(private router: Router,
    private baseService : BaseService,
    // private route: ActivatedRoute,
    // private authService: AuthService,
    // private userService: UserService,
    // private toastrService: ToastrServiceService 
    ){
    this.userForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      username: new FormControl('',[Validators.required, Validators.email]),
      phone:  new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required)
    });
  }
  ngOnInit(): void {
    // this.setUserFormData();
    this.baseService.currentUserData.subscribe((data:any) =>{
      console.log(data)
      this.userForm.setValue({
        firstName: data?.fullName.split(' ').slice(0, -1).join(' '),
        lastName: data?.fullName.split(' ').slice(-1).join(' '),
        username: data?.email,
        phone: data?.phoneNumber,
        role: data?.role,
        status: data?.accountStatus
      })
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

  goBack() {
    this.router.navigate(['/user-management']);
  }
 
}
