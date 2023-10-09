import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProofModalAdminComponent } from './view-proof-modal-admin.component';

describe('ViewProofModalAdminComponent', () => {
  let component: ViewProofModalAdminComponent;
  let fixture: ComponentFixture<ViewProofModalAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewProofModalAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewProofModalAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
