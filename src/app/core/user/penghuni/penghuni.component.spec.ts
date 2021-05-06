import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PenghuniComponent } from './penghuni.component';

describe('PenghuniComponent', () => {
  let component: PenghuniComponent;
  let fixture: ComponentFixture<PenghuniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PenghuniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PenghuniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
