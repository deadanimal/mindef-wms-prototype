import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PengurusanComponent } from './pengurusan.component';

describe('PengurusanComponent', () => {
  let component: PengurusanComponent;
  let fixture: ComponentFixture<PengurusanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PengurusanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PengurusanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
