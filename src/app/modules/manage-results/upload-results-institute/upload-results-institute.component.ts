import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConformationDialogComponent } from 'src/app/shared/components/conformation-dialog/conformation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { BaseService } from 'src/app/service/base.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrServiceService } from 'src/app/shared/services/toastr/toastr.service';


@Component({
  selector: 'app-upload-results-institute',
  templateUrl: './upload-results-institute.component.html',
  styleUrls: ['./upload-results-institute.component.scss']
})
export class UploadResultsInstituteComponent implements OnInit{
  breadcrumbItems = [
    {label: 'Manage Results', url: ''}
  ]

   file:any;
   fileUploadError: string;
   listOfFiles: any[] = [];
   files: any[] = [];

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private baseService: BaseService,
    private toastrService: ToastrServiceService
    ){}
  
  ngOnInit(): void {
    this.activateRoute.queryParams.subscribe(params => {
      console.log('params', params)
    })
  }
    

  public changeListener(event: any){
    this.fileUploadError = '';
      let selectedFile = event.target.files[0];
      const extension = selectedFile.name.split('.').pop();
      const fileSize = selectedFile.size;
      const allowedExtensions = ['xlsx'];
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
        this.uplodeInternalMarks(this.files[0])
    }
  }

  uplodeInternalMarks(file:File) {
    const formData = new FormData();
        formData.append("file", file);
      this.baseService.uplodeInternalMarks$(formData)
      .subscribe({
        next: (result) => {
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
        },
        error: (err: HttpErrorResponse) => {
          this.toastrService.showToastr(err, 'Error', 'error', '')
        }
      })
  }

  goToList() {
    this.router.navigate(['/manage-result/institute'])
  }

  DownloadTemplate() {
    this.baseService.downloadResultsTemplate().subscribe(blob => {
      const a = document.createElement('a');
      const objectUrl = URL.createObjectURL(blob);
      a.href = objectUrl;
      a.download = 'internalMarks.xlsx';
      a.click();
      URL.revokeObjectURL(objectUrl);
    });
  }
 
}
