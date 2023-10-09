import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-student-registration',
  templateUrl: './confirm-student-registration.component.html',
  styleUrls: ['./confirm-student-registration.component.scss']
})
export class ConfirmStudentRegistrationComponent {

  examDetails: any;
  studentsToRegister: any;
  registrationTableColumns: any

  constructor(
    public dialogRef: MatDialogRef<ConfirmStudentRegistrationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    if (data) {
      this.examDetails = data.examDetails;
      this.registrationTableColumns = data.tableColumns;
      this.studentsToRegister = data.StudentsToRegister;
    }
  }


  close() {
    this.dialogRef.close(false)
  }

  submit() {
    this.dialogRef.close(true)
  }

}
