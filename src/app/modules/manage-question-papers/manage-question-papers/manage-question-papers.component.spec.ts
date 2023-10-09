import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageQuestionPapersComponent } from './manage-question-papers.component';

describe('ManageQuestionPapersComponent', () => {
  let component: ManageQuestionPapersComponent;
  let fixture: ComponentFixture<ManageQuestionPapersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageQuestionPapersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageQuestionPapersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
