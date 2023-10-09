import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TableColumn } from '../../../shared/components/shared-table/shared-table.component';
import { HttpErrorResponse } from '@angular/common/http';
import { BaseService } from 'src/app/service/base.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})

export class UploadFileComponent implements OnInit {
  dialogDetails: any;
  file:any;
  fileUploadError: string;
  listOfFiles: any[] = [];
  files: any[] = [];
  uploadForm: FormGroup;
  examCycleColumns: TableColumn[] = [];
  examCycleData: any[] = [];
  constructor(private dialog: MatDialog,
    private router: Router,
    public dialogRef: MatDialogRef<UploadFileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private baseService: BaseService){
      this.dialogDetails = data
  }

  ngOnInit(): void {
    this.uploadForm = new FormGroup({
      file: new FormControl('', Validators.required)
    })
  }

  initalizeTableColumns() {
    this.examCycleColumns = [
      {
        columnDef: 'Examcycle Name',
        header: 'Examcycle Name',
        isSortable: false,
        isLink: false,
        cell: (element: Record<string, any>) => `${element['Examcycle Name']}`
      },
      {
        columnDef: 'Course',
        header: 'Course',
        isSortable: false,
        isLink: false,
        cell: (element: Record<string, any>) => `${element['Course']}`
      },
      {
        columnDef: 'Start Date',
        header: 'Start Date',
        isSortable: false,
        isLink: false,
        cell: (element: Record<string, any>) => `${element['Start Date']}`
      },
      {
        columnDef: 'End Date',
        header: 'End Date',
        isSortable: false,
        isLink: false,
        cell: (element: Record<string, any>) => `${element['End Date']}`
      },
      {
        columnDef: 'Exam Name',
        header: 'Exam Name',
        isSortable: false,
        isLink: false,
        cell: (element: Record<string, any>) => `${element['Exam Name']}`
      },
      {
        columnDef: 'Date',
        header: 'Exam Date',
        isSortable: false,
        isLink: false,
        cell: (element: Record<string, any>) => `${element['Date']}`
      },
      {
        columnDef: 'Start Time',
        header: 'Start Time',
        isSortable: false,
        isLink: false,
        cell: (element: Record<string, any>) => `${element['Start Time']}`
      },
      {
        columnDef: 'End Time',
        header: 'End Time',
        isSortable: false,
        isLink: false,
        cell: (element: Record<string, any>) => `${element['End Time']}`
      },
      {
        columnDef: 'Maximum Marks',
        header: 'Maximum Marks',
        isSortable: false,
        isLink: false,
        cell: (element: Record<string, any>) => `${element['Maximum Marks']}`
      },
    ]
  }
  goToList() {
    this.closeDialog('close');
  }

  uploadExamCycle() {
    const formData = new FormData();
    formData.append('file', this.files[0].name);
    formData.append('fileType', 'csv');
    this.closeDialog('close');
    this.baseService.examcyclebulkupload(formData).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    })
  } 

  closeDialog(btnType: string) {
    if (btnType === 'close') {
      this.dialogRef.close()
    } 
    else if(btnType ==='submit'){
      if (this.files.length > 0) {
        const data = {
          files : this.files,
        }
        this.dialogRef.close(data)
      }
    }
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
      const allowedExtensions = ['csv'];
      if (allowedExtensions.includes(extension)) {
        // validate file size to be less than 2mb if the file has a valid extension
        if (fileSize < 2000000) {
          if (this.listOfFiles.indexOf(selectedFile?.name) === -1) {
            this.files.push(selectedFile);
            this.listOfFiles.push(
              selectedFile.name.concat(this.formatBytes(selectedFile.size))
            );
            // to convert csv to JSON
            const reader = new FileReader();
            reader.onload = (e) => {
              const csvText = e.target?.result;
              const jsonData = this.csvToJson(csvText);
              this.examCycleData = JSON.parse(jsonData);
              if(this.examCycleData) {
                this.initalizeTableColumns();
              }
            } 
            console.log('examCycleData =>', this.examCycleData);
            reader.readAsText(selectedFile);
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
      }
     
  }

  csvToJson(csvText: any) {
    const lines = csvText.split('\n');
    const headers = lines[0].split(',');
  
    const jsonArray = [];
  
    for (let i = 1; i < lines.length; i++) {
      const data = lines[i].split(',');
      const row:any = {};
  
      for (let j = 0; j < headers.length; j++) {
        row[headers[j]] = data[j];
      }
  
      jsonArray.push(row);
    }
    return JSON.stringify(jsonArray, null, 2);
  }
}
