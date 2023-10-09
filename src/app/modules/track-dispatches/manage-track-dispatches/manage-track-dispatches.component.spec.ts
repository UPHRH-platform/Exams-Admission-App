import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTrackDispatchesComponent } from './manage-track-dispatches.component';

describe('ManageTrackDispatchesComponent', () => {
  let component: ManageTrackDispatchesComponent;
  let fixture: ComponentFixture<ManageTrackDispatchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageTrackDispatchesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageTrackDispatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
