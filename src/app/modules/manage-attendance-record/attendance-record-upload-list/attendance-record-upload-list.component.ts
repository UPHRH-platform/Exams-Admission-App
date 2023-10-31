import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from 'src/app/service/base.service';
import { ToastrServiceService } from 'src/app/shared/services/toastr/toastr.service';

@Component({
  selector: 'app-attendance-record-upload-list',
  templateUrl: './attendance-record-upload-list.component.html',
  styleUrls: ['./attendance-record-upload-list.component.scss']
})
export class AttendanceRecordUploadListComponent {
  constructor(private router: Router,
    private baseService: BaseService,
    private toasterService: ToastrServiceService) { }

  fileUploadError: string;
  breadcrumbItems = [
    { label: 'Attendance Record', url: '' },
  ]

  changeListener(event: any) {
    this.fileUploadError = '';
    const selectedFile: any = event.target.files[0];
    console.log(selectedFile);
    const extension = selectedFile.name.split('.').pop();
    const fileSize = selectedFile.size;
    const allowedExtensions = ['csv', 'xlsx'];
    if (allowedExtensions.includes(extension)) {
      // validate file size to be less than 2mb if the file has a valid extension
      if (fileSize < 2000000) {
        this.uploadFile(selectedFile);
      } else {
        this.fileUploadError = 'Please upload files with size less than 2MB';
      }
    } else {
      this.fileUploadError = `Please upload ${allowedExtensions.join(', ')} files`;
    }

  }



  uploadFile(file: File) {
    const formData = new FormData();
    formData.append("file", file, file.name);
    formData.append("fileType", "excel");
    this.baseService.bulkupload$(formData)
      .subscribe({
        next: (res: any) => {
        
          this.toasterService.showToastr('Attendance records uploaded successfully  !!', 'Success', 'success', '');
       this.goToAttendanceList()
        },
        error: (error: HttpErrorResponse) => {
          this.toasterService.showToastr('Failed to uploaded Attendance records !!', 'Error', 'error', '');
        }
      })

  }

  goToAttendanceList() {
    this.router.navigate(['manage-attendance'])
  }

  downloadTemplate() {
    const url = 'assets/templates/Template_Student_Attendance.xlsx'
    this.baseService.downloadTemplate(url).subscribe(blob => {
      const a = document.createElement('a');
      const objectUrl = URL.createObjectURL(blob);
      a.href = objectUrl;
      a.download = 'attendance.xlsx';
      a.click();
      URL.revokeObjectURL(objectUrl);
    });
  }
}
