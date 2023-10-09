import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceRecordListComponent } from './attendance-record-list.component';

describe('AttendanceRecordListComponent', () => {
  let component: AttendanceRecordListComponent;
  let fixture: ComponentFixture<AttendanceRecordListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendanceRecordListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendanceRecordListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
