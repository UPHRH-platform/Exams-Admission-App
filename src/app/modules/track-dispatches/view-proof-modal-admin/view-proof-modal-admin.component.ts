import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-view-proof-modal-admin',
  templateUrl: './view-proof-modal-admin.component.html',
  styleUrls: ['./view-proof-modal-admin.component.scss']
})
export class ViewProofModalAdminComponent implements OnInit {
  //#region (global variables)
  dialogDetails: any
  //#endregion

  //#region (constructor)
  constructor(
    public dialogRef: MatDialogRef<ViewProofModalAdminComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.dialogDetails = data
  }

  ngOnInit(): void {
    
  }

  closeDialog(response: boolean) {
    this.dialogRef.close(response)
  }

}
