import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceRecordUploadListComponent } from './attendance-record-upload-list.component';

describe('AttendanceRecordUploadListComponent', () => {
  let component: AttendanceRecordUploadListComponent;
  let fixture: ComponentFixture<AttendanceRecordUploadListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendanceRecordUploadListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendanceRecordUploadListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
