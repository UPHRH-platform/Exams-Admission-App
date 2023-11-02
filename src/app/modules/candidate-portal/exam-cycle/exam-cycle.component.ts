import { Component, EventEmitter, Input, Output } from '@angular/core';
import {  Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthServiceService } from 'src/app/core/services';
import { BaseService } from '../../../service/base.service';
import { ToastrServiceService } from 'src/app/shared/services/toastr/toastr.service';
import { CctvApprovalPopupComponent } from 'src/app/shared/components/cctv-approval-popup/cctv-approval-popup.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-exam-cycle',
  templateUrl: './exam-cycle.component.html',
  styleUrls: ['./exam-cycle.component.scss']
})
export class ExamCycleComponent {
  loggedInUserRole: string;

  @Input() studentDetails: any;
  @Input() examTableHeader: any;
  @Input() examTableData: any;
  @Input() isHallTicket: any;

  @Output() download: EventEmitter<boolean> = new EventEmitter<boolean>();
  stateData: { [k: string]: any; } | undefined;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthServiceService,
    private baseService: BaseService,
    private toasterService: ToastrServiceService,
  ) {
    this.loggedInUserRole = this.authService.getUserRoles()[0];
    this.stateData = this.router?.getCurrentNavigation()?.extras.state;
  }

  downloadHallTicket() {
    this.download.emit(true)
  }

  cancel() {
    this.router.navigateByUrl('/candidate-portal')
  }

  getTicketID(){
    return parseFloat(this?.stateData?.['data'].id); 
  }

  onApprove() {
   this.approveHallticket(this.getTicketID());
  }

  approveHallticket(id: number){
    let ticketId: any =[]
    ticketId.push(id)
    this.baseService.generateHallTkt$(ticketId).subscribe({
      next: (res: any) => {
        console.log(res)
        if(res.responseData.responseCodeNumeric === 200){
          this.toasterService.showToastr('Hall ticket approved successfully !!', 'Success', 'success', '');
          this.router.navigate(['/hall-ticket-management']);
        } else {
          this.toasterService.showToastr('Hall ticket approval failed', 'Error', 'error', '');
          this.router.navigate(['/hall-ticket-management']);
        }
      },
      error: (error: any) => {
        console.log(error.message);
        this.router.navigate(['/hall-ticket-management']);
        this.toasterService.showToastr('Something went wrong. Please try again', 'Error', 'error', '');
      }
    })
  }

  rejectHallticket(id: number, remarks : string){
    this.baseService.rejectHallTicket$(id, remarks).subscribe({
      next: (res: any) => {
        if(res.responseData.status === 'REJECTED'){
          this.toasterService.showToastr('Hall ticket rejected successfully !!', 'Success', 'success', '');
          this.router.navigate(['/hall-ticket-management']);
        } else {
          this.toasterService.showToastr('Hall ticket rejection failed', 'Error', 'error', '');
        }
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
        this.toasterService.showToastr('Something went wrong. Please try again', 'Error', 'error', '');
      }
    })
  }

  onReject() {
      const dialogRef = this.dialog.open(CctvApprovalPopupComponent, {
        data: {
          controls: [
          {
              controlLable: 'Add remarks',
              controlName: 'remarks',
              controlType: 'textArea',
              placeholder: 'Type here',
              value: '',
              validators: ['required']
            },
          ],
          buttons: [
            {
              btnText: 'Cancel',
              positionClass: 'left',
              btnClass: 'btn-outline',
              type: 'close'
            },
            {
              btnText: 'Submit',
              positionClass: 'right',
              btnClass: 'btn-full',
              type: 'submit'
            },
          ],
        },
        width: '700px',
        maxWidth: '90vw',
        maxHeight: '90vh'
      })

    dialogRef.afterClosed().subscribe((response: any) => {
      if (response) {
        this.rejectHallticket(this.getTicketID(), response.remarks);
      }
    })

  }


}
