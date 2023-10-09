import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CandidatePortalService {

  constructor(
    private http: HttpClient
  ) { }

  getExamCycles() {
    return this.http
  }

  getHallTicketDetails() {
    const data = ''
    return data
  }

  getResults() {}

  downloadHallTicket(ticketId: any) {}

  requestHallTicketModification(hallTicketData: any) {}

  downloadResults(ticketId: any) {}

  requestRevolution(examData: any) {}
}
