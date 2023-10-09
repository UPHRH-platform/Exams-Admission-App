import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http-service/http.service';

@Injectable({
  providedIn: 'root'
})
export class CctvVerificationService {

  constructor(
    private httpService: HttpService
  ) { }

  getExamCycles() {
    // return this.httpService.get()
  }

  getInstitutesCCTVdetails() {
    // return this.httpService.get().pipe(
    //   mergeMap(response => {
    //     return this.formateInstitutesCCTVdetails(response)
    //   })
    // )
  }

  // formateInstitutesCCTVdetails(institutesData: any) {
  //   return institutesData
  // }
}
