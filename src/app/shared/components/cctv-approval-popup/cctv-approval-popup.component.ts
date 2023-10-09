import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-cctv-approval-popup',
  templateUrl: './cctv-approval-popup.component.html',
  styleUrls: ['./cctv-approval-popup.component.scss']
})
export class CctvApprovalPopupComponent {
  //#region (global variables)
  dialogDetails: any
  dynamicFormGroup: FormGroup
  //#endregion

  //#region (constructor)
  constructor(
    public dialogRef: MatDialogRef<CctvApprovalPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.dialogDetails = data
    this.dynamicFormGroup = this.createFormControls(data.controls);
  }

  createFormControls(controls: any[]) {
    const formGroup: any = {}
    if (controls && controls.length) {
      controls.forEach((control: any) => {
        let validators: any[] = []
        if (control.validators) {
          control.validators.forEach((validator: string) => {
            if (validator === 'required') {
              validators.push(Validators.required)
            }
          })
        }

        formGroup[control.controlName] = new FormControl(control.value, validators)
      })
    }
    return new FormGroup(formGroup);
  }

  buttonClicked(type: string) {
    if (type === 'close') {
      this.dialogRef.close()
    } else {
      this.submit(type)
    }
  }

  submit(type: string) {
    if (this.dynamicFormGroup.valid) {
      const data = {
        form: this.dynamicFormGroup.value,
        type: type,
        instituteId: this.dialogDetails.instituteId
      }
      this.dialogRef.close(data)
    }
  }
}
