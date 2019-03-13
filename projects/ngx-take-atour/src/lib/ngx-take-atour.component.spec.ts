import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxTakeATourComponent } from './ngx-take-atour.component';

describe('NgxTakeATourComponent', () => {
  let component: NgxTakeATourComponent;
  let fixture: ComponentFixture<NgxTakeATourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxTakeATourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxTakeATourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
