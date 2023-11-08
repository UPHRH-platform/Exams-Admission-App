import { Injectable } from '@angular/core';
import { HttpService } from "../core/services/http-service/http.service";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, mergeMap } from 'rxjs';

import { ConfigService, RequestParam, ServerResponse } from '../shared';


@Injectable({
  providedIn: 'root'
})
export class BaseService extends HttpService {

  token: string;
  override baseUrl: string;
  headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer `
  };
  
  private userData = new BehaviorSubject({})
  currentUserData = this.userData.asObservable();


  constructor(private httpClient: HttpClient, cookieService: CookieService, private configService: ConfigService
  ) {
    super(httpClient, cookieService);
    this.baseUrl = environment.apiUrl;
    this.token = this.cookieService.get('access_token');
  }
  
  //#region (common apis)


  getExamCycleList$() {
    const requestParam: RequestParam = {
      url: this.baseUrl + this.configService.urlConFig.URLS.EXAM_MANAGEMENT.GET_EXAM_CYCLE_LIST,
      data: {},
    }
    return this.get(requestParam);
  }

  getAllExamCenterInstitutesList$() {
    const requestParam: RequestParam = {
      url: this.baseUrl + this.configService.urlConFig.URLS.EXAM_CENTER.ALL_CENTERS,
      data: {},
    }
    return this.get(requestParam);
  }

  getAllInstitutes$(){
    const requestParam: RequestParam = {
      url: this.baseUrl + this.configService.urlConFig.URLS.INSTITUTES.GET_ALL,
    }
    return this.get(requestParam);
  }

  downloadPdf$(pdfUrl: string) {
    return this.httpClient.get(pdfUrl, { responseType: 'blob' });
  }

  formatBytes(bytes: any, decimals = 2) {
    if (!+bytes) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  }
  
  //#endregion


  getInstitutesResultData$(examCycleId: string): Observable<any> {
    const requestParam: RequestParam = {
      url: `${this.baseUrl}${this.configService.urlConFig.URLS.MANAGE_RESULTS.MANAGE_RESULTS}?examCycle=${examCycleId}`,
      data: {}
    }
    return this.get(requestParam)
  }

  deleteResults(examCycleId: any, instituteId: string): Observable<any> {
    const requestParam: RequestParam = {
      url: `${this.baseUrl}${this.configService.urlConFig.URLS.MANAGE_RESULTS.DELETE_EXTERNAL_MARKS}examCycleId=${examCycleId}&instituteId=${instituteId}`
    }

    return this.delete(requestParam)
    
  }

  getUserData$(): Observable<any>{
    return of([    
  ])
  }



  getMarksForDashboard$(): Observable<any>{
    return of(
    []
    )
  }

  setUserData(userData:any){
    this.userData.next(userData)
  }


  getAllCourses$(): Observable<any> {
    const requestParam: RequestParam = {
      url: this.baseUrl + this.configService.urlConFig.URLS.COURSE.GET_ALL,
      data: {}
    }
    return this.get(requestParam);
  }

  getExamsAndQuestionPapersList$(): Observable<any> {
    const requestParam: RequestParam = {
      url: this.baseUrl + this.configService.urlConFig.URLS.COURSE.GET_ALL,
      data: {}
    }
    return of ([])
  }

  getQuestionsByExamsAndExamCycle(examCycleId : string | number, examId: string | number): Observable<any> {
    const requestParam: RequestParam = {
      url: this.baseUrl + this.configService.urlConFig.URLS.QUESTION_PAPER_MANAGEMENT.GET_QUESTIONPAPER_BY_EXAMS +`?examCycleId=${examCycleId}&examId=${examId}`,
      data: {}
    }
    return this.get(requestParam);
  }

  /**************************** hall ticket services start ****************************/


  generateHallTkt$(ids: [number]): Observable<any> {

    const requestParam: RequestParam = {
      url: this.baseUrl + this.configService.urlConFig.URLS.HALL_TICKET.GENERATE,
      data: ids,
    }
    return this.post(requestParam);
  }

  getHallTicketsForDataCorrections$(courseId?: number,examCycleId?: number, instituteId?: number) {
    let appendToReqParams = "";

    if(courseId){
      appendToReqParams = appendToReqParams+"courseId="+courseId;
    }
    if(examCycleId){
      appendToReqParams =  appendToReqParams+"&examCycleId="+examCycleId;
    }
    if(instituteId){
      appendToReqParams = appendToReqParams+"&instituteId="+instituteId;
    }
    const requestParam: RequestParam = {
      url: this.baseUrl + this.configService.urlConFig.URLS.HALL_TICKET.MODIFICATION+`?`+appendToReqParams,
      data: {},
    }
    return this.get(requestParam);
  }

  getHallTickets$(courseId?: number,examCycleId?: number, instituteId?: number): Observable<any> {

    let appendToReqParams = "";

    if(courseId){
      appendToReqParams = appendToReqParams+"courseId="+courseId;
    }
    if(examCycleId){
      appendToReqParams =  appendToReqParams+"&examCycleId="+examCycleId;
    }
    if(instituteId){
      appendToReqParams = appendToReqParams+"&instituteId="+instituteId;
    }

    const requestParam: RequestParam = {
      url: this.baseUrl + this.configService.urlConFig.URLS.HALL_TICKET.GET_ALL_DETAILS+`?`+appendToReqParams,
      data: {},
    }
    return this.get(requestParam);

  }

  private hallTktData = new BehaviorSubject<any>([]);

  setHallTicketData$(newData: any) {
    this.hallTktData.next(newData);
    console.log(newData)
  }

/*   getHallTicketData$(id: number) {
    return this.hallTktData.asObservable();
  } */

  getHallTicketData$(studentId: number, examCycleId: number) {
       const requestParam: RequestParam = {
         url: this.baseUrl + this.configService.urlConFig.URLS.HALL_TICKET.DETAILS+`?studentId=${studentId}&examCycleId=${examCycleId}`,
         data: {},
       }
       return this.get(requestParam);

  }

  getStudentResults$(StudentId: string, examCycleID: string) {
    const requestParam: RequestParam = {
      url:`${this.baseUrl}${this.configService.urlConFig.URLS.MANAGE_RESULTS.STUDENT_RESULTS}?StudentId=${StudentId}&examCycleId=${examCycleID}`,
      data: {}
    }
    return this.get(requestParam)
  }

  requestHallTicketModification$(reqbody: any) {
    const requestParam: RequestParam = {
      url: this.baseUrl + this.configService.urlConFig.URLS.HALL_TICKET.REQUEST_HALLTICKET_MODIFICATION,
      data: reqbody,
      header: {
        'Accept': '*/*',
        'x-authenticated-user-token': this.token
      }
    }
    return this.multipartPost(requestParam);
  }
  

  approveHallTicket$(id: number): Observable<any> {

    const requestParam: RequestParam = {
      url: this.baseUrl + this.configService.urlConFig.URLS.HALL_TICKET.APPROVE+id+'/approve',
      data: {}
    }
    return this.post(requestParam);

  }
 


  rejectHallTicket$(id: number, rejectReason: string): Observable<any> {

    const requestParam: RequestParam = {
      url: this.baseUrl + this.configService.urlConFig.URLS.HALL_TICKET.REJECT+id+'/reject',
      data: {rejectionReason : rejectReason},
    }
    return this.post(requestParam);

  }


  downloadHallTicket$(examCycleId:string, studentId: number){
    const requestParam: RequestParam = {
      url: this.baseUrl + this.configService.urlConFig.URLS.HALL_TICKET.DOWNLOAD+`?id=${studentId}&examCycleId=${examCycleId}`,
      data: {},
    }
    return this.get(requestParam);
  }
    /**************************** hall ticket services ends ****************************/
 /**************************** attendence services starts ****************************/

    getAttendenceByExamCycle$(examCycleId: number) {
      const requestParam: RequestParam = {
        url: this.baseUrl + this.configService.urlConFig.URLS.ATTENDENCE.GET_BY_EXAM_CYCLE+`${examCycleId}`,
        data: {},
      }
      return this.get(requestParam);
    }

    bulkupload$(formdata: FormData): Observable<ServerResponse> {
      const requestParam: RequestParam = {
        url: this.baseUrl + this.configService.urlConFig.URLS.ATTENDENCE.BULK_UPLOAD,
        data: formdata,
        header: {
          'Accept': '*/*',
          'x-authenticated-user-token': this.token
        }
      }
      return this.multipartPost(requestParam);
    }

     /**************************** attendence services ends ****************************/

     /**************************** fee management services starts ****************************/
     

     getAdminFeeTableData$(examCycleId?: number) {
      const requestParam: RequestParam = {
        url: this.baseUrl + this.configService.urlConFig.URLS.PAYMENT.INSTITUTE_LIST,
        data: {
          "page": 0,
          "size": 5,
          "filter": {
              "examCycle": 8
          },
          "sort": {
              "referenceNo": "desc"
          }
      }
      }
      return this.post(requestParam);
    }

    getFeeTableData$(examCycleId?: number) {
      const requestParam: RequestParam = {
        url: this.baseUrl + this.configService.urlConFig.URLS.PAYMENT.INSTITUTE_LIST,
        data: {
          "page": 0,
          "size": 5,
          "filter": {
              "examCycle": examCycleId
          },
          "sort": {
              "referenceNo": "desc"
          }
      }
      }
      return this.post(requestParam);
    }

    getStudentFeesListForInstitute$(examCycleId: number,instituteId: number): Observable<any>{
      const requestParam: RequestParam = {
        url: this.baseUrl + this.configService.urlConFig.URLS.PAYMENT.STUDENT_LIST+`${examCycleId}/${instituteId}/details`,
        data: {},
      }
      return this.get(requestParam);
    }
     
     payFees(feeDetails?: any): Observable<any> {

      const requestParam: RequestParam = {
        url: this.baseUrl + this.configService.urlConFig.URLS.PAYMENT.FEES,
        data: feeDetails
     /*    {
          "examCycleId": "18",
        "instituteId": 5,
        "studentExam": {
            "5": {
                "15": 2000.00
            },
            "6": {
                "15": 2000.00
            }
        },
        "amount": 2200.00,
        "payerType": "EXAM",
        "createdBy": "64bf323c-0cfd-440d-aa0e-be24d148b006"} */,
      }
      return this.post(requestParam);
  
    }

      /**************************** fee management services ends ****************************/
  

  /**************************** exam services ****************************/



  createExamCycle(request: object) {
    const requestParam: RequestParam = {
      url: `${this.baseUrl}${this.configService.urlConFig.URLS.EXAM_MANAGEMENT.CREATE_EXAM_CYCLE}`,
      data: request
    }
    return this.post(requestParam);
  }

  createExam(request: object, examCycleId: string | number) {
    const requestParam: RequestParam = {
      url: `${this.baseUrl}${this.configService.urlConFig.URLS.EXAM_MANAGEMENT.CREATE_EXAM}/${examCycleId}/addExam`,
      data: request
    }
    return this.post(requestParam);
  }

  examcyclebulkupload(formdata: FormData): Observable<ServerResponse> {
    const requestParam: RequestParam = {
      url: this.baseUrl + this.configService.urlConFig.URLS.EXAM_MANAGEMENT.EXAM_CYCLE_BULK_UPLOAD,
      data: formdata,
      header: {
        'Accept': '*/*',
        'x-authenticated-user-token': this.token
      }
    }
    return this.multipartPost(requestParam);
  }

/*********************************** enrollment service *****************************/
enrollStudent(formData: any): Observable<ServerResponse> {
  const requestParam: RequestParam = {
    url: this.baseUrl + this.configService.urlConFig.URLS.STUDENT_ENROLLMENT.CREATE,
    data: formData, 
    header: {
        'Accept': '*/*',
        'x-authenticated-user-token': this.token
    }
  }
  return this.multipartPost(requestParam);
}


/** institute login */
getStudentDetailsById(id: string | number) {
  const requestParam: RequestParam = {
    url: `${this.baseUrl}${this.configService.urlConFig.URLS.STUDENT_ENROLLMENT.GET_DETAILS_BY_ID}/${id}`,
    data: {},
  }
  return this.get(requestParam);
}

getEnrollmentList(request: any) {
  const requestParam: RequestParam = {
    url: `${this.baseUrl}${this.configService.urlConFig.URLS.STUDENT_ENROLLMENT.FIND_ENROLLMENT_BY_FILTER}?instituteId=${request.instituteId}&courseId=${request.courseId}&academicYear=${request.academicYear}&verificationStatus=${request.verificationStatus}`,
    data: request,
  }
  return this.get(requestParam);
}



getLongPendingStudentEnrollmentList$(courseId?: number, session?: string) {
  const requestParam: RequestParam = {
    url: `${this.baseUrl}${this.configService.urlConFig.URLS.STUDENT_ENROLLMENT.GET_LONG_PENDING_ENROLLENTS}`,
    data: {},
  }
  return this.get(requestParam);
}
// ?courseId=&academicYear=2023' \

/** verify student(Approve/reject) */

  //#region (CCTV management admin) 

  getInstitutesListByExamCycle$(examCycleId: number | string) {
    const requestParam: RequestParam = {
      url: this.baseUrl + this.configService.urlConFig.URLS.EXAM_CENTER.CENTERS_BY_EXAM_CYCLE + examCycleId,
      data: {},
    }
    return this.get(requestParam);
  }

  updateCCTVstatus$(request: any) {
    const requestParam: RequestParam = {
      url: `${this.baseUrl}${this.configService.urlConFig.URLS.EXAM_CENTER.UPDATE_CCTV_STATUS}?examCenterId=${request.examCenterId}&examCycleId=${request.examCycleId}`,
      data: request,
    }
    return this.put(requestParam);
  }

  assignAlternateExamCenter$(request: any) {
    const requestParam: RequestParam = {
      url: `${this.baseUrl}${this.configService.urlConFig.URLS.EXAM_CENTER.ASSIGN_ALTERNATE_EXAM_CENTER}?originalExamCenterId=${request.instituteID}&alternateInstituteId=${request.alternateInstituteId}&examCycleId=${request.examCycleId}`,
      data: {},
    }
    return this.put(requestParam);
  }

  getNearestInstitutesList(formBody: any) {
    const requestParam: RequestParam = {
      url: this.baseUrl + this.configService.urlConFig.URLS.EXAM_CENTER.VERIFIED_EXAM_CENTERS + '?district=' + formBody.district + '&examCycleId=' + formBody.examCycleId,
      data: {},
    }
    return this.get(requestParam);
  }
  //#endregion

getInstituteById(id: string | number) {
  const requestParam: RequestParam = {
    url: `${this.baseUrl}${this.configService.urlConFig.URLS.STUDENT_ENROLLMENT.GET_INSTITUTE_BY_ID}/${id}`,
    data: {},
  }
  return this.get(requestParam);
}

/*********************************** manage hall tickets service *****************************/
// getInstituteById(id: string | number) {
//   const requestParam: RequestParam = {
//     url: `${this.baseUrl}${this.configService.urlConFig.URLS.STUDENT_ENROLLMENT.GET_INSTITUTE_BY_ID}/${id}`,
//     data: {},
//   }
//   return this.get(requestParam);
// }
// }
// hallTicketModification(request: object) {
//   const requestParam: RequestParam = {
//     url: `${this.baseUrl}${this.configService.urlConFig.URLS.HALL_TICKET.HALL_TICKET_MODIFICATION}`,
//     data: request
//   }
//   return this.post(requestParam);
// }



// ************************ manage question papers ************************************

getAllQuestionPapers(examCycleId: any, examId: any): Observable<ServerResponse>  {
  const  reqParam: RequestParam = { 
    url: `${this.baseUrl}${this.configService.urlConFig.URLS.QUESTION_PAPER.GET_ALL}?examCycleId=${examCycleId}&examId=${examId}`
  }
  return this.get(reqParam);
}

uploadQuestionPaper(fileData: any):  Observable<ServerResponse> {
  const reqParam: RequestParam = {
    url: `${this.baseUrl}${this.configService.urlConFig.URLS.QUESTION_PAPER.UPLOAD}`,
    data: fileData,
    header: {
      'Accept': '*/*',
      'x-authenticated-user-token': this.token
    }
  }
 return this.multipartPost(reqParam);
}

downloadQuestionPaper(quesPaperId: any): Observable<ServerResponse> {
  const reqParam: RequestParam = {
    url: `${this.baseUrl}${this.configService.urlConFig.URLS.QUESTION_PAPER.DOWNLOAD}/${quesPaperId}`,
    data: {}
  }
 return this.get(reqParam);
}

getQuestionPaperById(questionPaperId: any): Observable<ServerResponse>  {
  const  reqParam: RequestParam = { 
    url: `${this.baseUrl}${this.configService.urlConFig.URLS.QUESTION_PAPER.GET_BY_ID}/${questionPaperId}`
  }
  return this.get(reqParam);
}

getQuestionPaperPreviewUrl(questionPaperId: any): Observable<ServerResponse>  {
  const  reqParam: RequestParam = { 
    url: `${this.baseUrl}${this.configService.urlConFig.URLS.QUESTION_PAPER.GET_PREVIEW_URL}/${questionPaperId}`
  }
  return this.get(reqParam);
}

deleteQuestionPaper(questionPaperId: any): Observable<ServerResponse>  {
  const  reqParam: RequestParam = { 
    url: `${this.baseUrl}${this.configService.urlConFig.URLS.QUESTION_PAPER.DELETE_QUESTION_PAPER}/${questionPaperId}`
  }
  return this.delete(reqParam);
}

getQuestionPapersByExamCycle(examCycleId: string | number):Observable<ServerResponse> {
  const requestParam: RequestParam = {
    url: this.baseUrl + this.configService.urlConFig.URLS.QUESTION_PAPER.GET_QUESTIONPAPER_BY_EXAMCYCLE + `/${examCycleId}`,
    data: {}
  }
  return this.get(requestParam);
}


  //#region (manage Results)

  getResults() {
    const response = [
      {
        examNames: 'Exam 1', 
        internalMarks: '45', 
        externalMarks: '45',
        totalMarks: '90',
        status: 'Pass'
      },{
        examNames: 'Exam 2', 
        internalMarks: '45', 
        externalMarks: '45',
        totalMarks: '95',
        status: 'Pass',
      },{
        examNames: 'Exam 3', 
        internalMarks: '25', 
        externalMarks: '5',
        totalMarks: '30',
        status: 'Fail',
      },
    ]
    return of(response)
  }

  getStudentResultData$(examCycleId: any, instituteId: string):Observable<any>{
    const requestParam: RequestParam = {
      url: `${this.baseUrl}${this.configService.urlConFig.URLS.MANAGE_RESULTS.RESULTS_BY_INSTITUTE}?examCycleId=${examCycleId}&instituteId=${instituteId}`,
      data: {},
    }
    return this.get(requestParam);
    // return of( {
    //   responseData: [
    //     {
    //       "id": 2,
    //             "instituteName": "IIT",
    //             "instituteId": 8,
    //             "firstName": 'John',
    //             "lastName": 'Smith',
    //             "enrollmentNumber": 'Enrolment Number',
    //             "motherName": 'Mary',
    //             "fatherName": 'Robert',
    //             "courseValue": 'ANM1',
    //             "examCycleValue": 'Fall 2023',
    //             "examValue": 'Exam',
    //             "internalMarks": 30,
    //             "passingInternalMarks": 12,
    //             "internalMarksObtained": 13,
    //             "practicalMarks": 23,
    //             "passingPracticalMarks": 12,
    //             "practicalMarksObtained": 12,
    //             "otherMarks": 12,
    //             "passingOtherMarks": 12,
    //             "otherMarksObtained": 12,
    //             "externalMarks": 12,
    //             "passingExternalMarks": 12,
    //             "externalMarksObtained": 12,
    //             "totalMarks": 12,
    //             "passingTotalMarks": 12,
    //             "totalMarksObtained": 12,
    //             "grade": 'c',
    //             "result": 'PASS',
    //             "status": 12,
    //             "published": false
    //     },
    //   ]
    // })
  }

  publishResults$(request: any) {
    const requestParam: RequestParam = {
      url: `${this.baseUrl}${this.configService.urlConFig.URLS.MANAGE_RESULTS.PUBLISH}`,
      data: request
    }
    return this.post(requestParam);
  }

  uplodeExternalMarks$(request: any) {
    const requestParam: RequestParam = {
      url: `${this.baseUrl}${this.configService.urlConFig.URLS.MANAGE_RESULTS.UPLOAD_EXTERNAL_MARKS}`,
      data: request,
      header: {
        Accept: "*/*",
        'x-authenticated-user-token': this.token
      }
    }
    return this.multipartPost(requestParam)
  }

  uploadRevisedMarks$(request: any) {
    const requestParam: RequestParam = {
      url: `${this.baseUrl}${this.configService.urlConFig.URLS.MANAGE_RESULTS.UPLOAD_REVISED_MARKS}`,
      data: request,
      header: {
        Accept: "*/*",
        'x-authenticated-user-token': this.token
      }
    }
    return this.multipartPost(requestParam)
  }

  getExamsByInstitute$(examCycleId: string, instituteId: number) {
    const requestParam: RequestParam = {
      url: `${this.baseUrl}${this.configService.urlConFig.URLS.MANAGE_RESULTS.EXAMS_OF_INSTITUTE_EXMACYCLE}?examCycleId=${examCycleId}&instituteId=${instituteId}`,
      data: {},
    }
    return this.get(requestParam);
    // return of({
    //   responseData: [
    //     {
    //       examName: 'Exam 1',
    //       examId: 1,
    //       lastDateToUplode: '25 Mar 2023',
    //       marksUploded: false,
    //     }, {
    //       examName: 'Exam 2',
    //       examId: 2,
    //       lastDateToUplode: '25 Mar 2023',
    //       marksUploded: true,
    
    //     },
    //   ]
    // })
  }

  uplodeInternalMarks$(request: any) {
    const requestParam: RequestParam = {
      url: `${this.baseUrl}${this.configService.urlConFig.URLS.MANAGE_RESULTS.UPLOAD_INTERNAL_MARKS}`,
      data: request,
      header: {
        Accept: "*/*",
        'x-authenticated-user-token': this.token
      }
    }
    return this.multipartPost(requestParam)
  }

  downloadResultsTemplate(): Observable<Blob> {
    return this.httpClient.get('assets/templates/instituteResultTemplate.xlsx', { responseType: 'blob' });
  }

  downloadTemplate(url: string): Observable<Blob> {
    return this.httpClient.get(url, { responseType: 'blob' });
  }

  getInternalMarksOfExam$(formBody: any) {
    const requestParam: RequestParam = {
      url: `${this.baseUrl}${this.configService.urlConFig.URLS.MANAGE_RESULTS.EXAM_MARKS_BY_INSTITUTE}?examCycle=${formBody.examCycleId}&exam=${formBody.examId}&institute=${formBody.instituteId}`,
      data: {}
    }
    return this.get(requestParam);
    // return of({
    //   responseData: [
    //     {
    //       "firstName": "jay (static data)",
    //       "courseName": "Mechanical Engineering",
    //       "exam": "Data Structure",
    //       "internalMark": 13,
    //       "lastName": "singh",
    //       enrolementNumber: 'EN2023 ABC37',
    //     },
    //     {
    //       "firstName": "jay",
    //       "courseName": "Mechanical Engineering",
    //       "exam": "Data Structure",
    //       "internalMark": 13,
    //       "lastName": "singh",
    //       enrolementNumber: 'EN2023 ABC37',
    //     },
    //   ]
    // })
  }


  //#endregion

  //#region (candidate portal)

  formateResultDetails() {
    const response = [

    {
      examName: 'Exam 1', 
      internalMarks: '45', 
      externalMarks: '45',
      totalMarks: '90',
      status: 'Pass'
    },{
      examName: 'Exam 2', 
      internalMarks: '45', 
      externalMarks: '45',
      totalMarks: '95',
      status: 'Pass',
    },{
      examName: 'Exam 3', 
      internalMarks: '25', 
      externalMarks: '5',
      totalMarks: '30',
      status: 'Fail',
    },
    ]
    return of(response)
  }
  //#endregion

getIntermediateSubjectList() {
  // const requestParam: RequestParam = {
  //   url: this.baseUrl + this.configService.urlConFig.URLS.STUDENT_ENROLLMENT.GET_INTERMEDIATE_SUBJECT_LIST,
  //   data: {}
  // }
  // return this.get(requestParam);
  return of({
    "id": "",
    "ver": "v1",
    "ts": "2023-10-10 09:54:13.703",
    "params": {
        "resmsgid": null,
        "msgid": null,
        "err": null,
        "status": null,
        "errmsg": null
    },
    "responseCode": "OK",
    "responseCodeNumeric": 200,
    "error": null,
    "result": {
        "response": ['Physics', 'Chemistry', 'Biology', 'Mathematics','Biotechnology','Economics','Political Science', 'History', 'Geography', 'Civics', 'Business studies', 'Accountancy', 'Home science', 'Sociology', 'Psychology', 'Philosophy', 'Health Care Science - Vocational Stream', 'Science', 'Literature', 'Education', 'English Core', 'Englist Elective', 'Without English'],
        "message": "OK"
    }
  })
  //   return of([
  //   'Physics', 'Chemistry', 'Biology', 'Mathematics','Biotechnology','Economics','Political Science', 'History', 'Geography', 'Civics', 'Business studies', 'Accountancy', 'Home science', 'Sociology', 'Psychology', 'Philosophy', 'Health Care Science - Vocational Stream', 'Science', 'Literature', 'Education', 'English Core', 'Englist Elective', 'Without English'
  // ])
}

updateStudentEnrollmentStatus(request: any) {
  const {id, status, remarks} = request;
  const requestParam: RequestParam = {
    url: `${this.baseUrl + this.configService.urlConFig.URLS.STUDENT_ENROLLMENT.VERIFY_STUDENT}/${id}/verify?status=${status}&remarks=${remarks}`,
    data: {}
  }
  return this.put(requestParam);
}

updateEnrollmentDetails(request: object, id: string | number) {
  const requestParam: RequestParam = {
    url: `${this.baseUrl}${this.configService.urlConFig.URLS.STUDENT_ENROLLMENT.GET_DETAILS_BY_ID}/${id}`,
    data: request,
    header: {
      'Accept': '*/*',
      'x-authenticated-user-token': this.token
  }
  }
  return this.multipartPut(requestParam);
}

// getIntermediateSubjects(): Observable<any> {
//   return of([
//     'Physics', 'Chemistry', 'Biology', 'Mathematics','Biotechnology','Economics','Political Science', 'History', 'Geography', 'Civics', 'Business studies', 'Accountancy', 'Home science', 'Sociology', 'Psychology', 'Philosophy', 'Health Care Science - Vocational Stream', 'Science', 'Literature', 'Education', 'English Core', 'Englist Elective', 'Without English'
//   ])
// }

getIntermediateStreamList(): Observable<any> {
  return of([
    {
      id: 1, 
      name: 'U.P. BOARD'
    }
  ])
}

getIntermediatePassedBoard(): Observable<any> {
  return of([
    {
      name: 'U.P. BOARD OF HIGH SCHOOL, ALLAHABAD',
      id: 1
    }
  ])
}

getExamCycleDetails(id: string): Observable<ServerResponse> {
  const requestParam: RequestParam = {
    url: this.baseUrl + this.configService.urlConFig.URLS.EXAM_MANAGEMENT.GET_EXAM_CYCLE_BY_ID + `/${id}`,
    data: {}
  }
  return this.get(requestParam);
}

deleteExamCycle(id: string): Observable<ServerResponse> {
  const requestParam: RequestParam = {
    url: this.baseUrl + this.configService.urlConFig.URLS.EXAM_MANAGEMENT.DELETE_EXAM_CYCLE + `/${id}`,
    data: {}
  }
  return this.delete(requestParam);
}

getAllInstitutes(): Observable<ServerResponse> {
  const requestParam: RequestParam = {
    url: this.baseUrl + this.configService.urlConFig.URLS.INSTITUTE_COURSE_MAPPING.GET_ALL_INSTITUTE_COURSE_MAPPING,
    data: {}
  }
  return this.get(requestParam);
}

getExamsByExamCycleId(id: string | number): Observable<ServerResponse> {
  const requestParam: RequestParam = {
    url: this.baseUrl + this.configService.urlConFig.URLS.EXAM_MANAGEMENT.GET_EXAM_BY_EXAM_CYCLE_ID + `/${id}`,
    data: {}
  }
  return this.get(requestParam)
}

updateExamCycleDetails(request: object, id: string | number): Observable<ServerResponse> {
  const requestParam: RequestParam = {
    url: this.baseUrl + this.configService.urlConFig.URLS.EXAM_MANAGEMENT.UPDATE_EXAM_CYCLE_DETAILS + `/${id}`,
    data: request
  }
  return this.put(requestParam);
}

getCoursesBasedOnInstitute(id: string | number): Observable<ServerResponse> {
  const requestParam: RequestParam = {
    url: this.baseUrl + this.configService.urlConFig.URLS.INSTITUTE_COURSE_MAPPING.GET_INST_COURSE_MAPPING_BY_INSTITUTE_ID + `?instituteId=${id}`,
    data: {}
  }
  return this.get(requestParam);
}

getInstituteDetailsByUser(id: string | number): Observable<ServerResponse> {
  const requestParam: RequestParam = {
    url: this.baseUrl + this.configService.urlConFig.URLS.USER_INSTITUTE_MAPPING.GET_INSTITUTE_BY_USER+ `/${id}`,
    data: {}
  }
  return this.get(requestParam);
}

getInstituteVerifiedDetails(instituteCode: string, examCycleId: string): Observable<ServerResponse> {
  const requestParam: RequestParam = {
    url: `${this.baseUrl}${this.configService.urlConFig.URLS.USER_INSTITUTE_MAPPING.EXAM_CENTER_VERIFIED}?instituteCode=${instituteCode}&examCycleId=${examCycleId}`,
    data: {}
  }
  return this.get(requestParam);
}

updateExamsForExamCycle(id: string | number, request: any): Observable<ServerResponse> {
  const requestParam: RequestParam = {
    url: this.baseUrl + this.configService.urlConFig.URLS.EXAM_MANAGEMENT.UPDATE_EXAMS_FOR_EXAM_CYCLE + `/${id}/updateExams`,
    data: request
  }
  return this.put(requestParam);
}
  //#region (dispatches)
  getDispatchesAllInstitutesList$(examCycleId: number, examId: number) {
    const requestParam: RequestParam = {
      url: this.baseUrl + this.configService.urlConFig.URLS.TRACK_DISPATCHES.GET_DISPATCHES_LIST + examCycleId + '/' + examId + '/allInstitutes',
      data: {}
    }
    return this.get(requestParam)
    // const response = {
    //   responseData: [
    //     {
    //       examName: 'Exam 1',
    //       lastDateToUpload: '25 Mar 2023',
    //       status: 'Pending',
    //     }, {
    //       examName: 'Exam 2',
    //       lastDateToUpload: '25 Mar 2023',
    //       status: 'Dispatched'
    //     },
    //   ]
    // }

    // return of(response)
  }

  getDispatchesViewProof$(dispatchId: number) {
    const requestParam: RequestParam = {
      url: this.baseUrl + this.configService.urlConFig.URLS.TRACK_DISPATCHES.DISPATCHES_VIEW_PROOF + dispatchId,
      data: {}
    }
    return this.get(requestParam)
  }

  getDispatchesListByInstitutes$(examCenterId: number | string, examCycleId: number | string) {
    const requestParam: RequestParam = {
      url: this.baseUrl + this.configService.urlConFig.URLS.TRACK_DISPATCHES.GET_DISPATCHES_LIST + examCenterId + '/' + examCycleId,
      data: {}
    }
    return this.get(requestParam)
  }

  uploadDispatch$(request: any) {
    const requestParam: RequestParam = {
      url: `${this.baseUrl}${this.configService.urlConFig.URLS.TRACK_DISPATCHES.DISPATCHE_UPLOAD}`,
      data: request,
      header: {
        Accept: "*/*",
        'x-authenticated-user-token': this.token
      }
    }
    return this.multipartPost(requestParam)
  }
  //#endregion

  getSubjectsByCourse(id: string | number): Observable<ServerResponse> {
    const requestParam: RequestParam = {
      url: this.baseUrl + this.configService.urlConFig.URLS.SUBJECTS.GET_SUBJECTS_BY_COURSE + `/${id}`,
      data: {}
    }
    return this.get(requestParam); 
  }

  getExamCycleByCourseAndAdmissionSession(request: object): Observable<ServerResponse> {
    const requestParam: RequestParam = {
      url: this.baseUrl + this.configService.urlConFig.URLS.EXAM_MANAGEMENT.EXAM_CYCLE_SEARCH,
      data: request
    }
    return this.post(requestParam);
  }

  getCCTVVerificationStatus(instId: string | number, examcycleId: string | number): Observable<ServerResponse> {
    const requestParam: RequestParam = {
      url: this.baseUrl + this.configService.urlConFig.URLS.EXAM_CENTER.GET_CCTV_VERIFICATION_BY_EXAMCYCLE + `?examCycleId=${examcycleId}&examCenterId=${instId}`,
      data: {}
    }
    return this.get(requestParam);
  }


  //#region (foramting common api data)
  formatExamCyclesForDropdown(response: any) {
    const examCycles: {
      examCyclesList: {
        id: number;
        examCycleName: string;
        courseId: string;
        status: string;
      }[]
    } = {
      examCyclesList: []
    }
    if (response && response.length > 0) {
      response.forEach((examCycle: any) => {
        const exam = {
          id: examCycle.id,
          examCycleName: examCycle.examCycleName,
          courseId: examCycle.courseId,
          status: examCycle.status,
        }
        examCycles.examCyclesList.push(exam)
      })
    }
    return of(examCycles)
    
  }

  formateExams(exams: any) {
    const result: {
      examsList: any[]
    } = {
      examsList: []
    }
    if (exams && exams.length) {
      exams.forEach((exam: any) => {
        const formatedexame = {
          value: exam.id, 
          viewValue: exam.examName,
          examCycleId: exam.examCycleId,
        }
        result.examsList.push(formatedexame)
      })
    }
    return of(result);
  }

  registerStudentsToExams(request: Array<object>): Observable<ServerResponse> {
    const requestParam: RequestParam = {
      url: this.baseUrl + this.configService.urlConFig.URLS.EXAM_STUDENT_REGISTRATION.REGISTER_STUDENT,
      data: request
    }
    return this.post(requestParam);
  }

  getStudentRegistrationByExamCycleAndInstId(examCycleId: string | number, instId: string | number): Observable<ServerResponse> {
    const requestParam: RequestParam = {
      url: this.baseUrl + this.configService.urlConFig.URLS.EXAM_STUDENT_REGISTRATION.VIEW_REGISTERED_STUDENTS + `/${examCycleId}/${instId}`,
      data: {}
    }
    return this.get(requestParam);
  }

  getRegistrationPendingStudents(examCycleId: string | number, instId: string | number): Observable<ServerResponse> {
    const requestParam: RequestParam = {
      url: this.baseUrl + this.configService.urlConFig.URLS.EXAM_STUDENT_REGISTRATION.GET_REGISTRATION_PENDING_STUDENTS + `?examCycleId=${examCycleId}&instituteId=${instId}`,
      data: {}
    }
    return this.get(requestParam);
  }

  reverseDate(date: string) {
    let Dob = new Date(date);
    return Dob.getDate() + "-" + `${Dob.getMonth() + 1}` + "-" + Dob.getFullYear()
  }

  getAdmissionSessionList() {
    const thisYear = (new Date()).getFullYear();
    let years:any =[];
    //let currentFY = [0].map((count) => `${thisYear - count}-${(thisYear - count + 1)}`).join();
    const yesterYears = [0, 1, 2, 3, 4].map((count) => `${thisYear - count - 1}-${(thisYear - count)}`);
    const aheadYears = [0, -1, -2, -3].map((count) => `${thisYear - count}-${(thisYear - count + 1)}`)
    years.push(...yesterYears, ...aheadYears);
    years.sort((a:any, b:any) => {
      if (a > b) {
        return 1
      }
      else {
        return - 1;
      }
    })
    return years;
  }

  getUserProfileInfo$(id:number){
    const requestParam: RequestParam = {
      url: this.baseUrl + this.configService.urlConFig.URLS.USER_PROFILE+`${id}`,
      data: {}
    }
    return this.get(requestParam);
  }
  //#endregion

}
