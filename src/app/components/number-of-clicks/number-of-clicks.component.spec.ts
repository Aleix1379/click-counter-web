import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberOfClicksComponent } from './number-of-clicks.component';

describe('NumberOfClicksComponent', () => {
  let component: NumberOfClicksComponent;
  let fixture: ComponentFixture<NumberOfClicksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumberOfClicksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberOfClicksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
