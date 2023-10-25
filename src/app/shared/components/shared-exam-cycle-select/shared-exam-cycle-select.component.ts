import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-shared-exam-cycle-select',
  templateUrl: './shared-exam-cycle-select.component.html',
  styleUrls: ['./shared-exam-cycle-select.component.scss']
})
export class SharedExamCycleSelectComponent {

 @Input() examCycleList: any =[];
 @Input() examCycleFormControl = new FormControl();
 @Output() selectedExamcycleId: EventEmitter<any> = new EventEmitter<any>();

 ngOnInit(){
  console.log(this.examCycleFormControl.value)
 }

 onSelectionChangeExamCycle(e: any){
  console.log(e.value)
  this.selectedExamcycleId.emit(e.value);
 }
}
