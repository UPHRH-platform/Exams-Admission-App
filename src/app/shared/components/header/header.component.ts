import { Component } from '@angular/core';
import { Router } from '@angular/router';
// import { AuthService } from 'src/app/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
 constructor(private router: Router, 
  // private authService: AuthService
  ){

 }

 navigateToProfilePage(){
  this.router.navigate(['/user-profile']);
 }

 logout(){
  // this.authService.logout();
  this.router.navigate(['/']);
 }

}
