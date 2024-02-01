import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-shared-institute-select',
  templateUrl: './shared-institute-select.component.html',
  styleUrls: ['./shared-institute-select.component.scss']
})
export class SharedInstituteSelectComponent {
  @Input() instituteList: any =[];
  
  @Input() instituteSelectFormControl = new FormControl();

  
  @Output() selectedInstitute: EventEmitter<any> = new EventEmitter();

  onInstituteChangeSelected(e: any){
   //console.log(e.value)
   this.selectedInstitute.emit(e);
  }
}
