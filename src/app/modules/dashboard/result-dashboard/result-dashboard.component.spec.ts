import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultDashboardComponent } from './result-dashboard.component';

describe('ResultDashboardComponent', () => {
  let component: ResultDashboardComponent;
  let fixture: ComponentFixture<ResultDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
