import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedInstituteSelectComponent } from './shared-institute-select.component';

describe('SharedInstituteSelectComponent', () => {
  let component: SharedInstituteSelectComponent;
  let fixture: ComponentFixture<SharedInstituteSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedInstituteSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedInstituteSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
