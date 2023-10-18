// http.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of as observableOf, Observable, throwError } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { HttpOptions, RequestParam, ServerResponse, Response } from 'src/app/shared';
import { AuthServiceService } from '../auth-service/auth-service.service';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  /**
   * Contains base Url for api end points
   */
  baseUrl: string;
  
  constructor(private http: HttpClient, public cookieService: CookieService) {}

 /**
   * for making get api calls
   *
   * @param requestParam interface
   */
 get(requestParam: RequestParam): Observable<ServerResponse> {
  const httpOptions: HttpOptions = {
    headers: requestParam.header ? requestParam.header : this.getHeader(),
    params: requestParam.param
  };
  return this.http.get<Response>(requestParam.url, httpOptions).pipe(
    mergeMap((data: Response) => {
      if (data.error && data.error) {
        return throwError(() => new Error(data.error.message));
      }
      const serverRes: ServerResponse ={
        statusInfo: {statusCode: 200, statusMessage: "success"},
        responseData: data.result?.response? data.result.response : data
      }
      return observableOf(serverRes);
    }));
}


multipartPost(requestParam: RequestParam): Observable<any> {
  const httpOptions: HttpOptions = {
    headers: requestParam.header,
    params: requestParam.param
  };
  return this.http.post<Response>(requestParam.url, requestParam.data, httpOptions).pipe(
    mergeMap((data: Response) => {
      if (data.error && data.error) {
        return throwError(() => new Error(data.error.message));
      }
      const serverRes: ServerResponse = {
        statusInfo: {statusCode: 200, statusMessage: "success"},
        responseData: data.result?.response? data.result.response : data
      }
      return observableOf(serverRes);
    }));
}

multipartPut(requestParam: RequestParam): Observable<any> {
  const httpOptions: HttpOptions = {
    headers: requestParam.header,
    params: requestParam.param
  };
  return this.http.put<Response>(requestParam.url, requestParam.data, httpOptions).pipe(
    mergeMap((data: Response) => {
      if (data.error && data.error) {
        return throwError(() => new Error(data.error.message));
      }
      const serverRes: ServerResponse ={
        statusInfo: {statusCode: 200, statusMessage: "success"},
        responseData: data.result?.response? data.result.response : data
      }
      return observableOf(serverRes);
    }));
}



   /**
   * for making post api calls
   * @param {RequestParam} requestParam interface
  */
   post(requestParam: RequestParam): Observable<ServerResponse> {
    const httpOptions: HttpOptions = {
      headers: requestParam.header ? this.getHeader(requestParam.header) : this.getHeader(),
      params: requestParam.param
    };
    return this.http.post<Response>(requestParam.url, requestParam.data, httpOptions).pipe(
      mergeMap((data: Response) => {
        if (data.error && data.error) {
          return throwError(() => new Error(data.error.message));
        }
        const serverRes: ServerResponse ={
          statusInfo: {statusCode: 200, statusMessage: data.result?.message ? data.result?.message : "success"},
          responseData: data.result?.response? data.result.response : data
        }
        return observableOf(serverRes);
      }));
  }

  /**
   * for making post api calls
   * @param {RequestParam} requestParam interface
  */
  formDataPost(requestParam: RequestParam): Observable<ServerResponse> {
    const httpOptions: HttpOptions = {
      headers: requestParam.header,
      params: requestParam.param
    };
    return this.http.post<Response>(requestParam.url, requestParam.data, httpOptions).pipe(
      mergeMap((data: Response) => {
        if (data.error && data.error) {
          return throwError(() => new Error(data.error.message));
        }
        const serverRes: ServerResponse ={
          statusInfo: {statusCode: 200, statusMessage: "success"},
          responseData: data.result?.response? data.result.response : data
        }
        return observableOf(serverRes);
      }));
  }

  /**
   * for making patch api calls
   *
   * @param {RequestParam} requestParam interface
   *
   */
  patch(requestParam: RequestParam): Observable<ServerResponse> {
    const httpOptions: HttpOptions = {
      headers: requestParam.header ? requestParam.header : this.getHeader(),
      params: requestParam.param
    };
    return this.http.patch<Response>(requestParam.url, requestParam.data, httpOptions).pipe(
      mergeMap((data: Response) => {
        if (data.error && data.error) {
          return throwError(() => new Error(data.error.message));
        }
        const serverRes: ServerResponse ={
          statusInfo: {statusCode: 200, statusMessage: "success"},
          responseData: data.result?.response? data.result.response : data
        }
        return observableOf(serverRes);
      }));
  }

  /**
   * for making delete api calls
   * @param {RequestParam} requestParam interface
   */
  delete(requestParam: RequestParam): Observable<ServerResponse> {
    const httpOptions: HttpOptions = {
      headers: requestParam.header ? requestParam.header : this.getHeader(),
      params: requestParam.param,
      body: requestParam.data
    };
    return this.http.delete<Response> (requestParam.url, httpOptions).pipe(
      mergeMap((data: Response) => {
        console.log(data);
        if (data.error && data.error) {
          return throwError(() => new Error(data.error.message));
        }
        const serverRes: ServerResponse ={
          statusInfo: {statusCode: 200, statusMessage: "success"},
          responseData: data.result?.response? data.result.response : data
        }
        return observableOf(serverRes);
      }));
  }

  /**
 * for making PUT api calls
 * @param {RequestParam} requestParam interface
 */
  put(requestParam: RequestParam): Observable<ServerResponse> {
    const httpOptions: HttpOptions = {
      headers: requestParam.header ? requestParam.header : this.getHeader(),
      params: requestParam.param,
      body: requestParam.data
    };
    return this.http.put<Response>(requestParam.url, requestParam.data, httpOptions).pipe(
      mergeMap((data: Response) => {
        if (data.error && data.error) {
          return throwError(() => new Error(data.error.message));
        }
        const serverRes: ServerResponse ={
          statusInfo: {statusCode: 200, statusMessage: data.result?.message ? data.result?.message : "success"},
          responseData: data.result?.response? data.result.response : data
        }
        return observableOf(serverRes);
      }));
  }

    /**
   * for preparing headers
   */
    private getHeader(headers?: HttpOptions['headers']): HttpOptions['headers'] {
      //const access_token = localStorage.getItem('access_token');
      const access_token = this.cookieService.get('access_token');
      let default_headers:any = {};
     // const access_token =  this.authServiceService.getToken();
      default_headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        
      };
      if(access_token) {
        default_headers["x-authenticated-user-token"] = access_token;
      }

      if (headers) {
        return { ...default_headers, ...headers };
      } else {
        return { ...default_headers };
      }
    }

}