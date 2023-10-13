import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {

  constructor() { }

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

}
