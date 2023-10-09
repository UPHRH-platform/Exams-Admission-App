import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewRegnComponent } from './add-new-regn.component';

describe('AddNewRegnComponent', () => {
  let component: AddNewRegnComponent;
  let fixture: ComponentFixture<AddNewRegnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewRegnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewRegnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
