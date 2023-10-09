import { Injectable } from '@angular/core';
import { mergeMap } from 'rxjs';
import { HttpService } from 'src/app/core/services';

@Injectable({
  providedIn: 'root'
})
export class FeeManagementService {

  constructor(
    private httpService: HttpService
  ) { }

  getExamCycles() {
    // return this.httpService.get()
  }

  getInstitutesData(searcKey: string) {
    // return this.httpService.get().pipe(
    //   mergeMap(response => {
    //     return this.formateInstitutesFeeDetails(response)
    //   })
    // )
  }

  formateInstitutesFeeDetails(institutesData: any) {
    return institutesData
  }

  getExamsOfInstitute(instituteId: string) {
    // return this.httpService.get().pipe(
    //   mergeMap(response => {
    //     return this.foramteInstituteExamsFeeDetails(response)
    //   })
    // )
  }

  foramteInstituteExamsFeeDetails(response: any) {
    return response
  }

  getExamFeeDetails(requestData: any) {
    // return this.httpService.get().pipe(
    //   mergeMap(response => {
    //     return this.formateExamFeeDetails(response)
    //   })
    // )
  }

  formateExamFeeDetails(data: any) {
    return data
  }

  updateExamFeeDetails() {
    // return this.httpService.post()
  }

  getPaymentUrl(postData: any) {
    // return this.httpService
  }

}
