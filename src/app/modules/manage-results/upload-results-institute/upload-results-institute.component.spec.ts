import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadResultsInstituteComponent } from './upload-results-institute.component';

describe('UploadResultsInstituteComponent', () => {
  let component: UploadResultsInstituteComponent;
  let fixture: ComponentFixture<UploadResultsInstituteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadResultsInstituteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadResultsInstituteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
