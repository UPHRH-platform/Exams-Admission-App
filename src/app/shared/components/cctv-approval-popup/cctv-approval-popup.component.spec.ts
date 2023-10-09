import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CctvApprovalPopupComponent } from './cctv-approval-popup.component';

describe('CctvApprovalPopupComponent', () => {
  let component: CctvApprovalPopupComponent;
  let fixture: ComponentFixture<CctvApprovalPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CctvApprovalPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CctvApprovalPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
