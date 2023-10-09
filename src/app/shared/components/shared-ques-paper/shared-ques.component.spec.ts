import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedQuestionPaperComponent } from './shared-ques.component';

describe('SharedQuestionPaperComponent', () => {
  let component: SharedQuestionPaperComponent;
  let fixture: ComponentFixture<SharedQuestionPaperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedQuestionPaperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedQuestionPaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
