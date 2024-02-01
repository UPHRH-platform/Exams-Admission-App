import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-pdf-viewer-modal',
  templateUrl: './pdf-viewer-modal.component.html',
  styleUrls: ['./pdf-viewer-modal.component.scss']
})
export class PdfViewerModalComponent  implements OnInit {
  dialogDetails: any

  constructor(
    public dialogRef: MatDialogRef<PdfViewerModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.dialogDetails = data
  }
src: any = "";
  ngOnInit(): void {
    console.log( this.dialogDetails )
    this.src = this.dialogDetails.src
  }

  closeDialog(response: boolean) {
    this.dialogRef.close(response)
  }

}