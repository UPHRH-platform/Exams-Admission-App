import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegdStudentsComponent } from './regd-students.component';

describe('RegdStudentsComponent', () => {
  let component: RegdStudentsComponent;
  let fixture: ComponentFixture<RegdStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegdStudentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegdStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
