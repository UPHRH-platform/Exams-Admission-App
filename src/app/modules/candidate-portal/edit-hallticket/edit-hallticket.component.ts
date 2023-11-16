import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-hallticket',
  templateUrl: './edit-hallticket.component.html',
  styleUrls: ['./edit-hallticket.component.scss']
})
export class EditHallticketComponent implements OnInit{
  //#region (global varaibles)

  //#region (Inputs and outputs)
  @Input() studentDetails: FormGroup;
  @Input() examName: string;
  //#endregion

  admissionSessionList: string[] = [];
  //#endregion

  ngOnInit(): void {
    // this.getAdmissionSessionList()
  }

  // getAdmissionSessionList() {
  //   const thisYear = (new Date()).getFullYear();
  //   const yesterYears = [0, 1, 2, 3, 4].map((count) => `${thisYear - count - 1}-${(thisYear - count)}`);
  //   const aheadYears = [0, -1, -2, -3].map((count) => `${thisYear - count}-${(thisYear - count + 1)}`)
  //   this.admissionSessionList.push(...yesterYears, ...aheadYears);
  //   this.admissionSessionList.sort((a, b) => {
  //     if(a > b) {
  //       return 1
  //     }
  //     else {
  //       return - 1;
  //     }
  //   })
  // }

  //#endregion


}
