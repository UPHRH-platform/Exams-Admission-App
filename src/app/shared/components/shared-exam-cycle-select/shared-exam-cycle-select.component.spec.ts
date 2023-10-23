import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedExamCycleSelectComponent } from './shared-exam-cycle-select.component';

describe('SharedExamCycleSelectComponent', () => {
  let component: SharedExamCycleSelectComponent;
  let fixture: ComponentFixture<SharedExamCycleSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedExamCycleSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedExamCycleSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
