import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-conformation-dialog',
  templateUrl: './conformation-dialog.component.html',
  styleUrls: ['./conformation-dialog.component.scss']
})
export class ConformationDialogComponent implements OnInit {
  //#region (global variables)
  dialogDetails: any
  //#endregion

  //#region (constructor)
  constructor(
    public dialogRef: MatDialogRef<ConformationDialogComponent>,
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
