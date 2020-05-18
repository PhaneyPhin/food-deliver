import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckbillDetailComponent } from './checkbill-detail.component';

describe('CheckbillDetailComponent', () => {
  let component: CheckbillDetailComponent;
  let fixture: ComponentFixture<CheckbillDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckbillDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckbillDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
