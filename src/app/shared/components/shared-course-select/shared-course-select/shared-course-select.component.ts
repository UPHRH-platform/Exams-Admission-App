import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-shared-course-select',
  templateUrl: './shared-course-select.component.html',
  styleUrls: ['./shared-course-select.component.scss']
})
export class SharedCourseSelectComponent {
  @Input() courseList: any =[];
  @Input() selectedCourseModel: string = "";
  
  @Input() courseFormControl = new FormControl();

  
  @Output() selectedCourse: EventEmitter<any> = new EventEmitter();

  onCourseChangeSelected(e: any){
   //console.log(e.value)
   this.selectedCourse.emit(e);
  }
}
