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

  //#region (exam cycles)
  getExamCycles() {
    return this.getExamCycleList$()
      .pipe(mergeMap((res: any) => {
        return this.formatExamCycles(res.responseData)
      }))
  }

  getExamCycleList$() {
    const requestParam: RequestParam = {
      url: this.baseUrl + this.configService.urlConFig.URLS.EXAM_MANAGEMENT.GET_EXAM_CYCLE_LIST,
      data: {},
    }
    return this.get(requestParam);
  }

  formatExamCycles(response: any) {
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
  //#endregion

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
  //#endregion


  getInstitutesResultData$(): Observable<any> {
    // return this.httpClient.get<any>("https://api.agify.io/?name=meelad");

    return of(  [
      {
        instituteName: 'NEW COLLEGE OF NURSING',
        instituteId: '123',
        course: 'xxxx',
        internalMarksProvided: true,
        finalMarksProvided: true,
        revisedFinalMarksProvided: true,
       
      },
      {
        instituteName: 'OLD COLLEGE OF NURSING',
        instituteId: '123',
        course: 'xxxx',
        internalMarksProvided:false,
        finalMarksProvided: true,
        revisedfinalMarksProvided: false,
     
      },
      {
        instituteName: 'MODERN COLLEGE OF NURSING',
        instituteId: '123',
        course: 'xxxx',
        internalMarksProvided: true,
        finalMarksProvided: false,
        revisedfinalMarksProvided: true,
    
      },
    
   
    ])
  }
  getStudentResultData$():Observable<any>{
    return of(
      [
        {
          studentName: 'Devaprathap Nagendra',
          courseName: 'XXXX',
          exams: 'Exam 1',
          internalMarks: '45',
          
        },
        {
          studentName: 'Madison',
          courseName: 'XXXX',
          exams: 'Exam 1',
          internalMarks: '48',
          
        },
        {
          studentName: 'Ravi',
          courseName: 'XXXX',
          exams: 'Exam 1',
          internalMarks: '47',
          
        },
        {
          studentName: 'Kanaka Rao',
          courseName: 'XXXX',
          exams: 'Exam 1',
          internalMarks: '49',
          
        },
        {
          studentName: 'Arun',
          courseName: 'XXXX',
          exams: 'Exam 1',
          internalMarks: '49'
          
        },
        {
          studentName: 'Aman',
          courseName: 'XXXX',
          exams: 'Exam 1',
          internalMarks: '45'
          
        },
        {
          studentName: 'Devaprathap N.',
          courseName: 'XXXX',
          exams: 'Exam 1',
          internalMarks: '44'
          
        },
    
   
      ])
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

  /**************************** hall ticket services start ****************************/


  generateHallTkt$(ids: [number]): Observable<any> {

    const requestParam: RequestParam = {
      url: this.baseUrl + this.configService.urlConFig.URLS.HALL_TICKET.GENERATE,
      data: ids,
    }
    return this.post(requestParam);
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

  getHallTicketData$(id: number) {
    return this.hallTktData.asObservable();
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
    /**************************** hall ticket services ends ****************************/

  

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
  updateCCTVstatus$(request: any) {
    const requestParam: RequestParam = {
      url: `${this.baseUrl}${this.configService.urlConFig.URLS.EXAM_CENTER.UPDATE_CCTV_STATUS}/${request.instituteId}?ipAddress=${request.ipAddress}&remarks=${request.remarks}&status=${request.status}`,
      data: {},
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
  //#region (candidate portal)
}

  //#region (Results)

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

  publishResults(request: any) {
    const requestParam: RequestParam = {
      url: `${this.baseUrl}${this.configService.urlConFig.URLS.MANAGE_RESULTS.PUBLISH}`,
      data: request
    }
    return this.post(requestParam);
  }

  //#endregion

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

    //#region (get exams)
    getExamsListByExamCycleId(examCycleId: number) {
      return this.getExamsByExamCycleId(examCycleId)
      .pipe(mergeMap((response: any) => {
        return this.formateExams(response.responseData)
      }))
    }


getExamsByExamCycleId(id: string | number): Observable<ServerResponse> {
  const requestParam: RequestParam = {
    url: this.baseUrl + this.configService.urlConFig.URLS.EXAM_MANAGEMENT.GET_EXAM_BY_EXAM_CYCLE_ID + `/${id}`,
    data: {}
  }
  return this.get(requestParam)
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

updateExamsForExamCycle(id: string | number, request: any): Observable<ServerResponse> {
  const requestParam: RequestParam = {
    url: this.baseUrl + this.configService.urlConFig.URLS.EXAM_MANAGEMENT.UPDATE_EXAMS_FOR_EXAM_CYCLE + `/${id}/updateExams`,
    data: request
  }
  return this.put(requestParam);
}
  //#region (dispatches)
  getDispatchesList$(formBody: any) {
    // const requestParam: RequestParam = {
    //   url: this.baseUrl + this.configService.urlConFig.URLS.TRACK_DISPATCHES.GET_DISPATCHES_LIST,
    //   data: formBody
    // }
    // return this.get(requestParam)
    const response = {
      responseData: [
        {
          examName: 'Exam 1',
          lastDateToUpload: '25 Mar 2023',
          status: 'Pending',
        }, {
          examName: 'Exam 2',
          lastDateToUpload: '25 Mar 2023',
          status: 'Dispatched'
        },
      ]
    }

    return of(response)
  }

  getDispatchesViewProof$(dispatchId: number) {
    const requestParam: RequestParam = {
      url: this.baseUrl + this.configService.urlConFig.URLS.TRACK_DISPATCHES.DISPATCHES_VIEW_PROOF + dispatchId,
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
        "Content-Type": "multipart/form-data",
      }
    }
    return this.post(requestParam)
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

}
