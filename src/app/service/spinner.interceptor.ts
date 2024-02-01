// spinner.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { finalize, catchError } from 'rxjs/operators';
import { SpinnerService } from './spinner.service';
import {  } from 'rxjs/operators';
import { ToastrServiceService } from 'src/app/shared/services/toastr/toastr.service';


@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  constructor(private spinnerService: SpinnerService,
    private toastrService: ToastrServiceService) {}
  private totalRequests = 0;

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.totalRequests++;
    this.spinnerService.setLoading(true);
    return next.handle(request).pipe(
      finalize(() => {
        this.totalRequests--;
        if (this.totalRequests == 0) {
          this.spinnerService.setLoading(false);
        }
      })
    )
    .pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';
         (error.error instanceof ErrorEvent) ?
          errorMsg = `Error: ${error.error.message}`
        :   errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
        
        console.log(errorMsg);
        this.toastrService.showToastr('Something went wrong. Please try again later', 'Error', 'error', '');
    
        return throwError(errorMsg);
      })
    )
}
  }
