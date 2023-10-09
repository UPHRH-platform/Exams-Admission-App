import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-attendance-record-upload-list',
  templateUrl: './attendance-record-upload-list.component.html',
  styleUrls: ['./attendance-record-upload-list.component.scss']
})
export class AttendanceRecordUploadListComponent {
  constructor(private router: Router,
    private _http:HttpClient){}

   file:any;
   fileUploadError: string;
   listOfFiles: any[] = [];
   files: any[] = [];
   breadcrumbItems = [
    { label: 'Attendance Record', url: '' },
  ]

   formatBytes(bytes: any, decimals = 2) {
    if (!+bytes) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  }

  public changeListener(event: any){
    this.fileUploadError = '';
      let selectedFile = event.target.files[0];
      const extension = selectedFile.name.split('.').pop();
      const fileSize = selectedFile.size;
      const allowedExtensions = ['csv'];
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
    
  }

  handleChange=()=>{
      // hiddenFileInput.current.click();
      console.log("change")
      let formData = new FormData();
      formData.append("file",this.file);

      console.log("file",this.file)
      this.uploadFiles(this.file)
    };  

    uploadFiles(file:File) {

      const formData = new FormData();
        formData.append("files", file);
      
      // this.baseService.uploadFiles$(this.osid, formData, this.endPointUrl).subscribe((data) => {
      //   this.docsResponseUrl = data.result;
      //   this.docsUrl = this.docsResponseUrl.split(',').filter(url => url.trim() !== "")
  
      //   const uploadObj = this.docsUrl.map(url => {
      //     const parts = url.split('=');
      //     const fileNameWithQueryParams = parts[1];
      //     const fileName = fileNameWithQueryParams.split('/').pop();
      //     const extractLastPart = fileName?.split('_').pop();
      //     const getuploadObject = {
      //       name: extractLastPart,
      //       url: url
      //     }
      //     return getuploadObject;
      //   });
      //   this.listOfFiles.push(...uploadObj)
      // })
      
    }

  goToList() {
    this.router.navigate(['manage-attendance'])
  }
}
