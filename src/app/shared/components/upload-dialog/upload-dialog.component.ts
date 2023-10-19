import { Component, Inject, OnInit  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-upload-dialog',
  templateUrl: './upload-dialog.component.html',
  styleUrls: ['./upload-dialog.component.scss']
})
export class UploadDialogComponent implements OnInit {
  //#region (global variables)
  dialogDetails: any;
  file:any;
  fileUploadError: string;
  listOfFiles: any[] = [];
  files: any[] = [];
  roomsFilter: any;
  uploadForm: FormGroup
  //#endregion
  
  constructor(
    public dialogRef: MatDialogRef<UploadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.dialogDetails = data
    this.uploadForm = new FormGroup({
      dispatchDate: new FormControl(),
      idType: new FormControl()
    })
  }

  ngOnInit(): void {
    
  }
  

  formatBytes(bytes: any, decimals = 2) {
   if (!+bytes) return '0 Bytes';
   const k = 1024;
   const dm = decimals < 0 ? 0 : decimals;
   const sizes = ['Bytes', 'KB', 'MB'];
   const i = Math.floor(Math.log(bytes) / Math.log(k));
   return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
 }

 public changeListener(event: any, btn: any){
   this.fileUploadError = '';
     let selectedFile = event.target.files[0];
     const extension = selectedFile.name.split('.').pop();
     const fileSize = selectedFile.size;
     const allowedExtensions = ['pdf','jpeg','jpg','png'];
     if (allowedExtensions.includes(extension)) {
       // validate file size to be less than 2mb if the file has a valid extension
       if (fileSize < 2000000) {
         if (this.listOfFiles.indexOf(selectedFile?.name) === -1) {
           this.files.push(selectedFile);
           this.listOfFiles.push(
             selectedFile.name.concat(this.formatBytes(selectedFile.size))
           );
         } else {
           console.log('file already exists');
         }
       } else {
         this.fileUploadError = 'Please upload files with size less than 2MB';
       }
     } else {
       this.fileUploadError = `Please upload ${allowedExtensions.join(', ')} files`;
     }
     if (this.files.length > 0) {
      btn.hideButton = true
      this.dialogDetails.buttons[btn.showBtn].hideButton = false
     }
    
 }


  closeDialog(btnType: string) {
    if (btnType === 'close') {
      this.dialogRef.close()
    } 
    else if(btnType ==='submit'){
      if (this.files.length > 0) {
        const data = {
          files : this.files,
          idType: this.uploadForm.value.idType,
          dispatchDate: this.uploadForm.value.dispatchDate
        }
        this.dialogRef.close(data)
      }
    }
  }

}