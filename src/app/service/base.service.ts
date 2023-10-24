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
    // return this.httpClient.get<any>("https://api.agify.io/?name=meelad");

    const result = {
      responseData: [
        {
          instituteName: 'NEW COLLEGE OF NURSING',
          instituteId: '123',
          course: 'xxxx',
          hasInternalMarks: true,
          hasFinalMarks: true,
          hasRevisedFinalMarks: true,
         
        },
        {
          instituteName: 'OLD COLLEGE OF NURSING',
          instituteId: '123',
          course: 'xxxx',
          hasInternalMarks:false,
          hasFinalMarks: false,
          hasRevisedFinalMarks: false,
       
        },
        {
          instituteName: 'MODERN COLLEGE OF NURSING',
          instituteId: '123',
          course: 'xxxx',
          hasInternalMarks: true,
          hasFinalMarks: false,
          hasRevisedFinalMarks: true,
      
        },
      
     
      ]
    }
    return of( result )

    // const requestParam: RequestParam = {
    //   url: `${this.baseUrl}${this.configService.urlConFig.URLS.MANAGE_RESULTS.MANAGE_RESULTS}?examCycle=${examCycleId}`,
    //   data: {}
    // }
    // return this.get(requestParam)
  }

  deleteResults(): Observable<any> {
    return of({
      statusInfo: {
        statusMessage: 'deleted'
      }
    })
  }

  getUserData$(): Observable<any>{
    return of([
      {
        fullName: 'Devaprathap Nagendra',
        email: 'name@gmail.com',
        phoneNumber: '9765454333',
        role: 'Institute',
        accountStatus: 'Active'
      },
      {
        fullName: 'D. Nagendra',
        email: 'name@gmail.com',
        phoneNumber: '9765454333',
        role: 'Admin',
        accountStatus: 'Active'
      },
  ])
  }

  getInstituteFeeTableData$(): Observable<any>{
    return of([
      {
        instituteName: 'NEW COLLEGE OF NURSING',
        courseName: 'xxxx',
        instituteCode: 'xxxx',
        registerStudentsCount: '10',
        paidStudentsCount: '10',
        totalFeePaid: '10000',
        viewList: 'View list'
      },
      {
        instituteName: 'NEW COLLEGE OF NURSING',
        courseName: 'xxxx',
        instituteCode: 'xxxx',
        registerStudentsCount: '25',
        paidStudentsCount: '25',
        totalFeePaid: '25000',
        viewList: 'View list'
      },
      {
        instituteName: 'NEW COLLEGE OF NURSING',
        courseName: 'xxxx',
        instituteCode: 'xxxx',
        registerStudentsCount: '30',
        paidStudentsCount: '28',
        totalFeePaid: '28000',
        viewList: 'View list'
      },
      {
        instituteName: 'NEW COLLEGE OF NURSING',
        courseName: 'xxxx',
        instituteCode: 'xxxx',
        registerStudentsCount: '50',
        paidStudentsCount: '40',
        totalFeePaid: '40000',
        viewList: 'View list'
      },
      {
        instituteName: 'NEW COLLEGE OF NURSING',
        courseName: 'xxxx',
        instituteCode: 'xxxx',
        registerStudentsCount: '30',
        paidStudentsCount: '20',
        totalFeePaid: '28000',
        viewList: 'View list'
      },
      {
        instituteName: 'NEW COLLEGE OF NURSING',
        courseName: 'xxxx',
        instituteCode: 'xxxx',
        registerStudentsCount: '25',
        paidStudentsCount: '25',
        totalFeePaid: '25000',
        viewList: 'View list'
      },
      {
        instituteName: 'NEW COLLEGE OF NURSING',
        courseName: 'xxxx',
        instituteCode: 'xxxx',
        registerStudentsCount: '10',
        paidStudentsCount: '10',
        totalFeePaid: '10000',
        viewList: 'View list'
      },
      {
        instituteName: 'NEW COLLEGE OF NURSING',
        courseName: 'xxxx',
        instituteCode: 'xxxx',
        registerStudentsCount: '25',
        paidStudentsCount: '25',
        totalFeePaid: '25000',
        viewList: 'View list'
      }
    ])
  }
  getStudentFeeTableData$(): Observable<any>{
    return of([
      {
        studentName: '',
        enrolementNumber: 'XXXX',
        courseName: 'XXXX',
        exams: 'Exam ',
        numberOfExams: '',
        fee: '000',
        status: 'Paid'
      },
      {
        studentName: 'Madison Tran',
        enrolementNumber: 'XXXX',
        courseName: 'XXXX',
        exams: 'Exam 1,Exam 2,Exam 3 ',
        numberOfExams: '3',
        fee: '3000',
        status: 'Paid'
      },
      {
        studentName: 'Raci Verma',
        enrolementNumber: 'XXXX',
        courseName: 'XXXX',
        exams: 'Exam 2',
        numberOfExams: '1',
        fee: '1000',
        status: 'Paid'
      },
      {
        studentName: 'Sumalatha Krishna',
        enrolementNumber: 'XXXX',
        courseName: 'XXXX',
        exams: 'Exam 3',
        numberOfExams: '1',
        fee: '1000',
        status: 'Paid'
      },
      {
        studentName: 'Kanaka Rao',
        enrolementNumber: 'XXXX',
        courseName: 'XXXX',
        exams: 'Exam 1,Exam 2',
        numberOfExams: '2',
        fee: '2000',
        status: 'Paid'
      },
      {
        studentName: 'Ravi Verma',
        enrolementNumber: 'XXXX',
        courseName: 'XXXX',
        exams: 'Exam 2',
        numberOfExams: '1',
        fee: '1000',
        status: 'Paid'
      },


      {
        studentName: 'Nancy Kurian',
        enrolementNumber: 'XXXX',
        courseName: 'XXXX',
        exams: 'Exam 1',
        numberOfExams: '1',
        fee: '1000',
        status: 'Pending',
      },{
        studentName: 'Jordan Allen',
        enrolementNumber: 'XXXX',
        courseName: 'XXXX',
        exams: 'Exam 1, Exam 2',
        numberOfExams: '2',
        fee: '2000',
        status: 'Pending'
      },{
        studentName: 'Purandara Das',
        enrolementNumber: 'XXXX',
        courseName: 'XXXX',
        exams: 'Exam 1, Exam 2',
        numberOfExams: '2',
        fee: '2000',
        status: 'Pending'
      },
    ])
  }
  getMarksForDashboard$(): Observable<any>{
    return of(
      [
        {
          examName: 'Anatomy',
          totalMarks: 100,
          passingMarks: 40,
          totalAttempts: 96,
          failedAttempts: 12,
          passedAttempts: 84,
          passPercentage: 88,
          maximumMarks: 96,
          minimumMarks: 16,
          avgMarks: 62,
          standardDeviation: 15,
  
        },
        {
          examName: 'Physiology',
          totalMarks: 100,
          passingMarks: 40,
          totalAttempts: 96,
          failedAttempts: 12,
          passedAttempts: 84,
          passPercentage: 88,
          maximumMarks: 96,
          minimumMarks: 16,
          avgMarks: 62,
          standardDeviation: 15,
        },
        {
          examName: 'Biochemistry',
          totalMarks: 100,
          passingMarks: 40,
          totalAttempts: 96,
          failedAttempts: 12,
          passedAttempts: 84,
          passPercentage: 88,
          maximumMarks: 96,
          minimumMarks: 16,
          avgMarks: 62,
          standardDeviation: 15,
        },
        {
          examName: 'Pathology',
          totalMarks: 100,
          passingMarks: 40,
          totalAttempts: 96,
          failedAttempts: 12,
          passedAttempts: 84,
          passPercentage: 88,
          maximumMarks: 96,
          minimumMarks: 16,
          avgMarks: 62,
          standardDeviation: 15,
        },
        {
          examName: 'Microbiology',
          totalMarks: 100,
          passingMarks: 40,
          totalAttempts: 96,
          failedAttempts: 12,
          passedAttempts: 84,
          passPercentage: 88,
          maximumMarks: 96,
          minimumMarks: 16,
          avgMarks: 62,
          standardDeviation: 15,
        },
        {
          examName: 'Aggregate',
          totalMarks: 'NA',
          passingMarks: 'NA',
          totalAttempts: 480,
          failedAttempts: 60,
          passedAttempts: 420,
          passPercentage: 88,
          maximumMarks: 96,
          minimumMarks: 16,
          avgMarks: 62,
          standardDeviation: 15,
        },
      ]
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
    return of ([
      {
  
        examId: 1,
        courseName: 'One',
        examDate: 'One',
        examStartTime: '10.00 A.M.',
        marks: '100',
        examName: 'msc Nursing (Exam 1)',
        questionPaperList: [
          {
            id: 1234,
            name: 'Question paper set 1'
          },
          {
            id: 1234,
            name: 'Question paper set 2'
          }
        ]
      },
      {
        examId: 1,
        courseName: 'Two',
        examDate: 'Some date',
        marks: '100',
        examStartTime: '12.00 A.M.',
        examName: 'msc Nursing (Exam 2)',
        questionPaperList: [
          {
            id: 1234,
            name: 'Question paper set 1'
          },
          {
            id: 1234,
            name: 'Question paper set 2'
          }
        ]
  
      },
      {
        examId: 1,
        courseName: 'Three',
        examDate: 'Some date',
        examStartTime: '10.00 A.M.',
        marks: '100',
        examName: 'msc Nursing (Exam 3)',
        questionPaperList: [
          {
            id: 1234,
            name: 'Question paper set 1'
          },
          {
            id: 1234,
            name: 'Question paper set 2'
          }
        ]
  
      },
      {
  
        examId: 1,
        courseName: 'Four',
        examDate: 'Some date',
        examStartTime: '10.00 A.M.',
        marks: '100',
        examName: 'msc Nursing (Exam 4)',
        questionPaperList: [
          {
            id: 1234,
            name: 'Question paper set 1'
          },
          {
            id: 1234,
            name: 'Question paper set 2'
          }
        ]
  
      },
  
    ])
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

  getHallTicketsForDataCorrections$() {
    const requestParam: RequestParam = {
      url: this.baseUrl + this.configService.urlConFig.URLS.HALL_TICKET.MODIFICATION,
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
      appendToReqParams =  appendToReqParams+"examCycleId="+examCycleId;
    }
    if(instituteId){
      appendToReqParams = appendToReqParams+"instituteId="+instituteId;
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

  requestHallTicketModification$(reqbody: any) {
    console.log(reqbody)
    const requestParam: RequestParam = {
      url: this.baseUrl + this.configService.urlConFig.URLS.HALL_TICKET.MODIFICATION,
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


  downloadHallTicket(){
    const requestParam: RequestParam = {
      url: this.baseUrl + this.configService.urlConFig.URLS.HALL_TICKET.DOWNLOAD+'?dateOfBirth=1995-12-15&id=4',
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
     payFees(feeDetails?: any): Observable<any> {

      const requestParam: RequestParam = {
        url: this.baseUrl + this.configService.urlConFig.URLS.PAYMENT.FEES,
        data: {
          "examCycleId": 18,
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
        "createdBy": "64bf323c-0cfd-440d-aa0e-be24d148b006"},
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
    // const requestParam: RequestParam = {
    //   url: `${this.baseUrl}${this.configService.urlConFig.URLS.EXAM_CENTER.UPDATE_CCTV_STATUS}/${request.instituteId}?ipAddress=${request.ipAddress}&remarks=${request.remarks}&approvalStatus=${request.approvalStatus}`,
    //   data: {},
    // }
    const requestParam: RequestParam = {
      url: `${this.baseUrl}${this.configService.urlConFig.URLS.EXAM_CENTER.UPDATE_CCTV_STATUS}/${request.instituteId}?ipAddress=${request.ipAddress}&remarks=${request.remarks}&approvalStatus=${request.approvalStatus}`,
      data: request,
    }
    return this.put(requestParam);
  }

  assignAlternateExamCenter$(request: any) {
    const requestParam: RequestParam = {
      url: `${this.baseUrl}${this.configService.urlConFig.URLS.EXAM_CENTER.ASSIGN_ALTERNATE_EXAM_CENTER}/${request.instituteID}?alternateInstituteId=${request.alternateInstituteId}`,
      data: request,
    }
    return this.put(requestParam);
  }

  getNearestInstitutesList(formBody: any) {
    const requestParam: RequestParam = {
      url: this.baseUrl + this.configService.urlConFig.URLS.EXAM_CENTER.VERIFIED_EXAM_CENTERS + '?district=' + formBody.district,
      data: formBody,
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

downloadQuestionPaper(payloadData: any): Observable<ServerResponse> {
  const reqParam: RequestParam = {
    url: `${this.baseUrl}${this.configService.urlConFig.URLS.QUESTION_PAPER.DOWNLOAD}`,
    data: payloadData
  }
 return this.post(reqParam);
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
    url: `${this.baseUrl}${this.configService.urlConFig.URLS.QUESTION_PAPER.DELETE}/${questionPaperId}`
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

  getStudentResultData$():Observable<any>{
    return of( {
      responseData: [
        {
          studentName: 'Devaprathap Nagendra',
          courseName: 'XXXX',
          exams: 'Exam 1',
          internalMarks: '45',
          externalMarks: '23',
          revisedMarks: '45'
          
        },
        {
          studentName: 'Madison',
          courseName: 'XXXX',
          exams: 'Exam 1',
          internalMarks: '48',
          externalMarks: '23',
          revisedMarks: '50'
          
        },
        {
          studentName: 'Ravi',
          courseName: 'XXXX',
          exams: 'Exam 1',
          internalMarks: '47',
          externalMarks: '43',
          revisedMarks: '32'
          
        },
        {
          studentName: 'Kanaka Rao',
          courseName: 'XXXX',
          exams: 'Exam 1',
          internalMarks: '49',
          externalMarks: '34',
          revisedMarks: '45'
          
        },
        {
          studentName: 'Arun',
          courseName: 'XXXX',
          exams: 'Exam 1',
          internalMarks: '49',
          externalMarks: '40',
          revisedMarks: '35'
          
        },
        {
          studentName: 'Aman',
          courseName: 'XXXX',
          exams: 'Exam 1',
          internalMarks: '45',
          externalMarks: '30',
          revisedMarks: '46'
          
        },
        {
          studentName: 'Devaprathap N.',
          courseName: 'XXXX',
          exams: 'Exam 1',
          internalMarks: '44',
          externalMarks: '45',
          revisedMarks: '50'
          
        },
      ]
    })
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

  getExamDetailsByInstitute$(examCycleId: string, instituteId: number) {
    return of({
      responseData: [
        {
          examName: 'Exam 1',
          examId: 1,
          lastDateToUplode: '25 Mar 2023',
          marksUploded: false,
        }, {
          examName: 'Exam 2',
          examId: 2,
          lastDateToUplode: '25 Mar 2023',
          marksUploded: true,
    
        },
      ]
    })
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

  getInternalMarksOfExam$(formBody: any) {
    return of({
      responseData: [
        {
          "firstName": "jay",
          "courseName": "Mechanical Engineering",
          "exam": "Data Structure",
          "internalMark": 13,
          "lastName": "singh",
          enrolementNumber: 'EN2023 ABC37',
        },
        {
          "firstName": "jay",
          "courseName": "Mechanical Engineering",
          "exam": "Data Structure",
          "internalMark": 13,
          "lastName": "singh",
          enrolementNumber: 'EN2023 ABC37',
        },
      ]
    })
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

getInstituteVerifiedDetails(instituteCode: string): Observable<ServerResponse> {
  const requestParam: RequestParam = {
    url: this.baseUrl + this.configService.urlConFig.URLS.USER_INSTITUTE_MAPPING.EXAM_CENTER_VERIFIED+ `?instituteCode=${instituteCode}`,
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
  //#endregion

}
