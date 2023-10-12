export interface attendanceTableData {
    id: string;
    ticketId: number;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    requesterType: string;
    assignedToId: any;
    assignedToName: string;
    description: string;
    junk: boolean;
    createdDate: string;
    updatedDate: string;
    createdDateTS: number;
    updatedDateTS: number;
    lastUpdatedBy: number;
    escalated: boolean;
    escalatedDate: string;
    escalatedDateTS: number;
    escalatedTo: number;
    status: string;
    requestType: any;
    priority: string;
    escalatedBy: number
}
  export interface TableColumn {
    columnDef: string;
    header: string;
    cell: Function;
    isLink?: boolean;
    showDeleteIcon?: boolean;
    isAction?: boolean;
    url?: string;
    isSortable?: boolean;
    isMenuOption?:boolean;
    isCheckBox?:boolean;
    isDropdown?: boolean;
    cellStyle?: any;
    classes?: any;
  }

  export interface DialogData {
    title: string;
    content: any;
    otpSubmitted?: boolean;
    name?: string;
    email?: string;
    phone?: string;
    ticketId?: number;
  }

  export interface userTableData {
    id: number;
    name:string;
    username:string;
    phone:number;
    role:string;
    status:string;
    isMenuOption?:boolean;
    isActive?: boolean;
    roles?: any
  }

  export interface DashboardTableData {
    id: string;
    bucket: string;
    responsibleOfficer: string;
    number: string;
    pending: string;
    inProcess: string;
    resolved: string;
    responseNotNeeded: string;
    duplicate: string;
  }

  export interface DashboardAnalytics {
    status: ''
    pending: string;
    inProcess: string;
    resolved: string;
    responseNotNeeded: string;
    duplicate: string
  }

  export interface QuestionPaper {
    examId: number;
    courseName: string;
    examDate: string;
    examStartTime: string;
    marks: string;
    examName: string;
    questionPaperList: QuestionPaperList[]
  }

  export interface QuestionPaperList{
    id: number;
    name: string;
  }

  export interface RegdStudentsTableData {
    id?: number; //make it a mandatory field during api integration
    name: string;
    rollNo: string;
    course: string;
    admissionYr: string;
    noOfExam: string;
    examName?: string[];
  }

  export interface HallTicket {
    id: number;
    name: string;
    course: string;
    rollNo: string;
    attendanCePercentage: string;
  }
  
  export interface Institute {
    value: string;
    viewValue: string;
  }
export interface Course {
  courseCode: string;
  courseName: string;
  courseYear: string;
  description: string;
  id: number
}
  export interface Year {
    value: string;
    viewValue: string;
  }

  export interface HallTicket {
          id: number,
          firstName:  string,
          lastName:  string,
          dob: string,
          courseName:  string,
          courseYear: string,
          studentEnrollmentNumber: string,
          registrationDate: string,
          status: string,
          remarks: string,
          examCenterName: string,
          feesPaid: boolean,
          attendancePercentage: number,
          examCycle: ExamCycle 
  }

  export interface ExamCycle {
    id: number,
    name: string,
    startDate: string,
    endDate: string,
    createdBy: string,
    modifiedBy: string,
    status: string,
    obsolete: string,
    exams: Exam []
  }

  export interface Exam {
    examName: string,
    examDate: string,
    startTime:string,
    endTime: string,
    createdBy: string,
    modifiedBy: string,
    isResultsPublished: string,
    obsolete: string
  }