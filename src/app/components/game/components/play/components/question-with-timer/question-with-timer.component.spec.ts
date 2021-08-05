import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionWithTimerComponent } from './question-with-timer.component';

describe('QuestionWithTimerComponent', () => {
  let component: QuestionWithTimerComponent;
  let fixture: ComponentFixture<QuestionWithTimerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionWithTimerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionWithTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
