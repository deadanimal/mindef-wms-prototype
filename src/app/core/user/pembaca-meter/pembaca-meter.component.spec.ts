import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PembacaMeterComponent } from './pembaca-meter.component';

describe('PembacaMeterComponent', () => {
  let component: PembacaMeterComponent;
  let fixture: ComponentFixture<PembacaMeterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PembacaMeterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PembacaMeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
