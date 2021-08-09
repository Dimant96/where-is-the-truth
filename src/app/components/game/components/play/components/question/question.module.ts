import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {QuestionComponent} from './question.component';
import {CommonQuestionComponent} from './components/common-question/common-question.component';
import {QuestionWithTimerComponent} from './components/question-with-timer/question-with-timer.component';
import {TimerComponent} from './components/timer/timer.component';
import {DualViewTimerModule} from '../../pipe/dual-view-timer/dual-view-timer.module';

@NgModule({
    declarations: [QuestionComponent, CommonQuestionComponent, QuestionWithTimerComponent, TimerComponent],
    imports: [
        CommonModule,
        DualViewTimerModule
    ]
})
export class QuestionModule {
}
