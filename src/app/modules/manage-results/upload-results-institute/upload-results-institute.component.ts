import { Component,Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ConformationDialogComponent } from 'src/app/shared/components/conformation-dialog/conformation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { BaseService } from 'src/app/service/base.service';


@Component({
  selector: 'app-upload-results-institute',
  templateUrl: './upload-results-institute.component.html',
  styleUrls: ['./upload-results-institute.component.scss']
})
export class UploadResultsInstituteComponent {
  breadcrumbItems = [
    {label: 'Manage Results', url: ''}
  ]
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private baseService: BaseService){}
    

   file:any;
   fileUploadError: string;
   listOfFiles: any[] = [];
   files: any[] = [];


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
              selectedFile.name.concat(this.baseService.formatBytes(selectedFile.size))
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
      if(this.files.length > 0){
      const dialogRef = this.dialog.open(ConformationDialogComponent, {
        data: {
          dialogType: 'success',
          description: ['Internal marks uploaded successfully'],
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
         this.router.navigateByUrl('/manage-result/institute')
        }
      })
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
    this.router.navigate(['/manage-result/institute'])
  }
 
}
