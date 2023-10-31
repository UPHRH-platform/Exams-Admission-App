import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateResultsPdfComponent } from './generate-results-pdf.component';

describe('GenerateResultsPdfComponent', () => {
  let component: GenerateResultsPdfComponent;
  let fixture: ComponentFixture<GenerateResultsPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateResultsPdfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateResultsPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
