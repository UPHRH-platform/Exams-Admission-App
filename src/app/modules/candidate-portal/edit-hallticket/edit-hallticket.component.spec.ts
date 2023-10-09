import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHallticketComponent } from './edit-hallticket.component';

describe('EditHallticketComponent', () => {
  let component: EditHallticketComponent;
  let fixture: ComponentFixture<EditHallticketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditHallticketComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditHallticketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
