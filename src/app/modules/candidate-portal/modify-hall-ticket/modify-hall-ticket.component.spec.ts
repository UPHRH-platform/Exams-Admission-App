import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyHallTicketComponent } from './modify-hall-ticket.component';

describe('ModifyHallTicketComponent', () => {
  let component: ModifyHallTicketComponent;
  let fixture: ComponentFixture<ModifyHallTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyHallTicketComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyHallTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
