import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedCourseSelectComponent } from './shared-course-select.component';

describe('SharedCourseSelectComponent', () => {
  let component: SharedCourseSelectComponent;
  let fixture: ComponentFixture<SharedCourseSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedCourseSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedCourseSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
