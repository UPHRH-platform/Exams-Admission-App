import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestRevalutionComponent } from './request-revalution.component';

describe('RequestRevalutionComponent', () => {
  let component: RequestRevalutionComponent;
  let fixture: ComponentFixture<RequestRevalutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestRevalutionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestRevalutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
