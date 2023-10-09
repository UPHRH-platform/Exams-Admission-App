import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidatePortalService } from '../services/candidate-portal.service';
import { MatDialog } from '@angular/material/dialog';
import { ConformationDialogComponent } from 'src/app/shared/components/conformation-dialog/conformation-dialog.component';
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

  @Input() hallTicketDetails: any;
  @Input() examTableHeader: any;
  @Input() examTableData: any;
  @Input() isHallTicket: any;

  constructor(
    private router: Router,
    private candidatePortalService: CandidatePortalService,
    private dialog: MatDialog,
    private authService: AuthServiceService,
    private baseService: BaseService,
    private toasterService: ToastrServiceService,
    private route: ActivatedRoute
  ) {
    this.loggedInUserRole = this.authService.getUserRoles()[0];
  }

  downloadHallTicket() {
    this.candidatePortalService.downloadHallTicket('')
    // .subscribe((data: any) => {
      const dialogRef = this.dialog.open(ConformationDialogComponent, {
        data: {
          dialogType: 'success',
          description: ['Hall ticket downloaded successfully'],
          buttons: [
            {
              btnText: 'Ok',
              positionClass: 'center',
              btnClass: 'btn-full',
              response: true
            },
          ],
        },
        width: '700px',
        height: '400px',
        maxWidth: '90vw',
        maxHeight: '90vh'
      })
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
         this.router.navigateByUrl('/candidate-portal')
        }
      })
    // })
  }

  cancel() {
    this.router.navigateByUrl('/candidate-portal')
  }

  getTicketID(){
    return parseFloat(this?.route?.snapshot?.paramMap?.get('id') || '0'); 
  }

  onApprove() {
   this.approveHallticket(this.getTicketID());
  }

  approveHallticket(id: number){
    this.baseService.approveHallTicket$(id).subscribe({
      next: (res: any) => {
        if(res.responseData.status === 'APPROVED'){
          this.toasterService.showToastr('Hall ticket approved successfully !!', 'Success', 'success', '');
          this.router.navigate(['/hall-ticket-management']);
        } else {
          this.toasterService.showToastr('Hall ticket approval failed', 'Error', 'error', '');
        }
      },
      error: (error: any) => {
        console.log(error.message);
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
