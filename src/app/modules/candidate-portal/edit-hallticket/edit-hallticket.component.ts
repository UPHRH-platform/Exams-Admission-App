import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-hallticket',
  templateUrl: './edit-hallticket.component.html',
  styleUrls: ['./edit-hallticket.component.scss']
})
export class EditHallticketComponent {
  //#region (global varaibles)

  //#region (Inputs and outputs)
  @Input() studentDetails: FormGroup;
  @Input() examName: string;
  //#endregion

  //#endregion


}
