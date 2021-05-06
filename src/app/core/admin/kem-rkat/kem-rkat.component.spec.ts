import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KemRkatComponent } from './kem-rkat.component';

describe('KemRkatComponent', () => {
  let component: KemRkatComponent;
  let fixture: ComponentFixture<KemRkatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KemRkatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KemRkatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
