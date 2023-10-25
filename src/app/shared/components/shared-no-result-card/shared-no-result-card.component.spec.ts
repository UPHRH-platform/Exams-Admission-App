import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedNoResultCardComponent } from './shared-no-result-card.component';

describe('SharedNoResultCardComponent', () => {
  let component: SharedNoResultCardComponent;
  let fixture: ComponentFixture<SharedNoResultCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedNoResultCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedNoResultCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
