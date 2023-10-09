import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConformationDialogComponent } from 'src/app/shared/components/conformation-dialog/conformation-dialog.component';
import { UploadDialogComponent } from 'src/app/shared/components/upload-dialog/upload-dialog.component';

@Component({
  selector: 'app-update-track-dispatches-institute',
  templateUrl: './update-track-dispatches-institute.component.html',
  styleUrls: ['./update-track-dispatches-institute.component.scss']
})
export class UpdateTrackDispatchesInstituteComponent {
  cardList: any[] = [
    {
      title: 'Exam 1',
      lable: 'Last date for Upload',
      date: '25 Mar 2023',
      status: 'Pending',
      navigateUrlSecond: '/manage-result/institute/upload',
    }, {
      title: 'Exam 2',
      lable: 'Last date for Upload',
      date: '25 Mar 2023',
      status: 'Dispatched',
      navigateUrl: '/manage-result/institute/list',
      navigateUrlSecond: '/manage-result/institute/upload',

    },
  ];
  examCycleList = [
    {
      examName: 'Exam Cycle 1',
      value: '1'
    },{
      examName: 'Exam Cycle 2',
      value: '2'
    },{
      examName: 'Exam Cycle 3',
      value: '3'
    },
  ]

  examCycle = new FormControl('');
  breadcrumbItems = [
    {label: 'Track Dispatches', url: ''}
  ]
  constructor(
    private router: Router,
    private dialog: MatDialog
    // private candidatePortalService: CandidatePortalService
  ) {}


  
  uploadProof(){
    const dialogRef = this.dialog.open(UploadDialogComponent, {
    data: {
              heading:'Upload proof',     
              labelOne: 'Select Dispatch Date',
              labelTwo:'Attach file(s)',
              dateSelect: 'dateSelect',  

              // select: {
              //   selectCycleList: [
              //     {
              //       displayValue: 'Exam 1',
              //       value: 'Exam 1'
              //     },
              //     {
              //       displayValue: 'Exam 2',
              //       value: 'Exam 2'
              //     }
              //   ]
              // },


              description: ['Hall ticket downloaded successfully'],
              buttons: [
                {
                  btnText: 'Browse',
                  positionClass: 'right ml2',
                  btnClass: 'btn-full',
                  showBtn: 1,
                  hideButton: false,
                  btnType: 'browse'

                },
                {
                  btnText: 'Upload',
                  positionClass: 'right ml2',
                  btnClass: 'btn-full',
                  btnType: 'submit',
                  hideButton: true,
                },
                {
                  btnText: 'Cancel',
                  positionClass: 'right',
                  btnClass: 'btn-outline',
                  hideButton: false,
                  btnType: 'close'
                },
                
              ],
            },
    })
    dialogRef.afterClosed().subscribe(result => {
    console.log("file",result)
        if (result) {
          const dialogRef = this.dialog.open(ConformationDialogComponent, {
            data: {
              dialogType: 'success',
              description: ['Dispatches uploaded successfully'],
              buttons: [
                {
                  btnText: 'Ok',
                  positionClass: 'center',
                  btnClass: 'btn-full',
                  response: true,
                  // click:this.router.navigateByUrl('/manage-result/institute'),
    
                },
              ],
            },
            width: '700px',
            height: '400px',
            maxWidth: '90vw',
            maxHeight: '90vh'
          })
          dialogRef.afterClosed().subscribe(files => {
            if (files) {
             this.router.navigateByUrl('/dispatches/update')
            }
          })        }
    })
  }

}
