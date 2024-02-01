import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/core/services';
// import { AuthService } from 'src/app/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  private readonly TOKEN_KEY = 'access_token';
  showProfileNavBar = false;
  private userData: any;
  userName: string;
  enableProfile: boolean;
  constructor(private router: Router, private authService: AuthServiceService) {
  }

  ngOnInit() {
    const token = this.authService.getUserData();
    if (token) {
      this.showProfileNavBar = true;
      this.userData = this.authService.getUserRepresentation();
      if (this.userData.attributes.Role[0] === 'exams_student' || this.userData.attributes.Role[0] === 'exams_institute') {
        this.enableProfile = true
      } else {
        this.enableProfile = false
      }
      this.generateUserName();
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  generateUserName() {
    //console.log(this.userData);
    const firstName = this.userData?.firstName;
    const lastName = this.userData?.lastName;
    this.userName = firstName?.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
  }

  navigateToProfilePage() {
    console.log(this.userData.attributes.Role[0])
    this.router.navigate([`/user-profile/${this.userData.attributes.Role[0]}`]);
  }
}
//['/msg', {my_object: JSON.stringify(row)}]