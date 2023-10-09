import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTrackDispatchesInstituteComponent } from './update-track-dispatches-institute.component';

describe('UpdateTrackDispatchesInstituteComponent', () => {
  let component: UpdateTrackDispatchesInstituteComponent;
  let fixture: ComponentFixture<UpdateTrackDispatchesInstituteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateTrackDispatchesInstituteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateTrackDispatchesInstituteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
