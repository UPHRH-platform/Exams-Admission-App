import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-view-proof-modal-admin',
  templateUrl: './view-proof-modal-admin.component.html',
  styleUrls: ['./view-proof-modal-admin.component.scss']
})
export class ViewProofModalAdminComponent implements OnInit {
  //#region (global variables)
  dialogDetails: any
  pdfUrl: any
  //#endregion

  //#region (constructor)
  constructor(
    public dialogRef: MatDialogRef<ViewProofModalAdminComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sanitizer: DomSanitizer
  ) {
    this.dialogDetails = data
  }

  ngOnInit(): void {
    this.pdfUrl = this.getSafeUrl()
    
  }

  getSafeUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.dialogDetails.documentLink);
  }

  closeDialog(response: boolean) {
    this.dialogRef.close(response)
  }

}
