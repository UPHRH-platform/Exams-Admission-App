import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of as observableOf, Observable } from 'rxjs';
import { RequestParam, ServerResponse } from 'src/app/shared';
import { ConfigService } from 'src/app/shared/services/config/config.service';
import { environment } from 'src/environments/environment';
import { HttpService } from '../http-service/http.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService extends HttpService {
  override baseUrl: string;
  userManagementURL: string;
  private readonly TOKEN_KEY = 'access_token';
  private readonly USER_DATA = "user_data";
  private readonly USER_REPRESENTATION = "user_representation";
  private readonly ALL_ROLES = "all_roles";

  constructor(http: HttpClient, private configService: ConfigService,
    cookieService: CookieService
   ) {
    super(http, cookieService);
    this.baseUrl = environment.apiUrl;
    this.userManagementURL = environment.userManagementURL;
  }

  login(username: string, password: string): Observable<ServerResponse> {
    // Implement your login API call and get the JWT token
    const reqParam: RequestParam = {
      url: this.userManagementURL + this.configService.urlConFig.URLS.KEYCLOAK_LOGIN,
      data: {username,password},
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJSR3RkMkZzeG1EMnJER3I4dkJHZ0N6MVhyalhZUzBSSyJ9.kMLn6177rvY53i0RAN3SPD5m3ctwaLb32pMYQ65nBdA',
      }
    }
    return this.post(reqParam);
  }

  getUserRoles(): string[] {
    const token = this.getToken();
    let role = '';
    if (token) {
      const userData= this.getUserData();
      const userRole = userData.Role[0];
      switch(userRole) {
        case 'exams_superadmin':
          role= this.configService.rolesConfig.ROLES.SUPERADMIN;
          break;
          case 'exams_admin':
          role= this.configService.rolesConfig.ROLES.ADMIN;
          break;
        case 'exams_institute':
          role= this.configService.rolesConfig.ROLES.INSTITUTE;
          break;
        case 'exams_student':
          role= this.configService.rolesConfig.ROLES.STUDENT;
          break;
        case 'exams_secretary':
          role = this.configService.rolesConfig.ROLES.SECRETARY;
      }
    }
    return [role];
    // return [this.configService.rolesConfig.ROLES.ADMIN];
  }

  getAllRoles(): Observable<ServerResponse> {
    const res = {
      statusInfo: {statusCode: 200, statusMessage: "success"},
      responseData: [
        {
            "id": 1,
            "name": "SUPERADMIN",
            "orgId": 1
        },
        {
            "id": 2,
            "name": "ADMIN",
            "orgId": 1
        },
        {
            "id": 3,
            "name": "INSTITUTE",
            "orgId": 1
        },
        {
          "id": 4,
          "name": "STUDENT",
          "orgId": 1,
        }
    ]
    }
    return observableOf(res);
  }

  saveAllRoles(roles: any): void {
    localStorage.setItem(this.ALL_ROLES,JSON.stringify(roles));
  }

  saveUserData(userData: any):void {
    this.saveToken(userData?.accessToken);
    localStorage.setItem(this.USER_DATA,JSON.stringify(userData.userRepresentation?.attributes));
    localStorage.setItem(this.USER_REPRESENTATION, JSON.stringify(userData.userRepresentation));
  }

  getUserData() {
    const userData = localStorage.getItem(this.USER_DATA);
    return userData ? JSON.parse(userData) : null;
  }

  getUserRepresentation() {
    const userRepresentation = localStorage.getItem(this.USER_REPRESENTATION);
    return userRepresentation ? JSON.parse(userRepresentation) : null;
  }

  saveToken(token: string): void {
    const cookieOptions: any = {
      expires: new Date(Date.now() + 3600000), // Example: Cookie expires in 1 hour
      path: '/', // Set the path as needed
      secure: true, // Only send the cookie over HTTPS (recommended)
      httpOnly: true, // Set the HttpOnly flag
    };
    this.cookieService.set('access_token', token, undefined, undefined, undefined, undefined, cookieOptions);

    //this.cookieService.set('access_token', token);
   // localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    let tokenFromCookie = this.cookieService.get('access_token')
    return this.cookieService.get('access_token');
   // return localStorage.getItem(this.TOKEN_KEY);
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_DATA);
    localStorage.removeItem(this.ALL_ROLES);
    this.cookieService.deleteAll('/');
  }

  isLoggedIn(): boolean{
    console.log(!!this.getToken());
    return !!this.getToken();
  }

  /** roles */
  isSuperAdmin(): boolean  {
    let issuperadmin: boolean = false;
    const userRole = this.getUserRoles()[0];
    if(userRole !== undefined) {
      if (userRole.indexOf('exams_superadmin') > -1) {
        issuperadmin = true;
      }
    }
    return issuperadmin;
  }

  isAdmin(): boolean  {
    let isadmin: boolean = false;
    const userRole = this.getUserRoles()[0];
    if(userRole !== undefined) {
      if (userRole.indexOf('exams_admin') > -1) {
        isadmin = true;
      }
    }
    return isadmin;
  }

  isInstitute(): boolean  {
    let isInstitute: boolean = false;
    const userRole = this.getUserRoles()[0];
    if(userRole !== undefined) {
      if (userRole.indexOf('exams_institute') > -1) {
        isInstitute = true;
      }
    }
    return isInstitute;
  }

  isStudent(): boolean  {
    let isStudent: boolean = false;
    const userRole = this.getUserRoles()[0];
    if(userRole !== undefined) {
      if (userRole.indexOf('exams_student') > -1) {
        isStudent = true;
      }
    }
    return isStudent;
  }

  isSecretary(): boolean {
    let isSecretary: boolean = false;
    const userRole = this.getUserRoles()[0];
    if(userRole !== undefined) {
      if (userRole.indexOf('exams_secretary') > -1) {
        isSecretary = true;
      }
    }
    return isSecretary;
  }

  /* otp based login apis */
  generateOTP(username: string): Observable<ServerResponse> {
    const reqParam: RequestParam = {
      url: this.userManagementURL + this.configService.urlConFig.URLS.LOGIN_GENERATE_OTP,
      data: {username},
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJSR3RkMkZzeG1EMnJER3I4dkJHZ0N6MVhyalhZUzBSSyJ9.kMLn6177rvY53i0RAN3SPD5m3ctwaLb32pMYQ65nBdA',
      }
    }
    return this.post(reqParam);
  }

  loginWithOTP(email: string, otp: any): Observable<ServerResponse> {
    const reqParam: RequestParam = {
      url: this.userManagementURL + this.configService.urlConFig.URLS.OTP_LOGIN,
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJSR3RkMkZzeG1EMnJER3I4dkJHZ0N6MVhyalhZUzBSSyJ9.kMLn6177rvY53i0RAN3SPD5m3ctwaLb32pMYQ65nBdA',
      },
      data: {
        email: email,
        otp: otp
      }
    }
    return this.post(reqParam);
  }
  
}
