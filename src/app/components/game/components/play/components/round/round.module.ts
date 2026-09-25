import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DualViewTimerModule} from '../../pipe/dual-view-timer/dual-view-timer.module';
import {CommonQuestionComponent} from './components/common-question/common-question.component';
import {QuestionWithTimerComponent} from './components/question-with-timer/question-with-timer.component';
import {TimerComponent} from './components/timer/timer.component';
import {RoundComponent} from './round.component';
import {FitTextDirective} from './directives/fit-text.directive';

@NgModule({
    declarations: [RoundComponent, CommonQuestionComponent, QuestionWithTimerComponent, TimerComponent, FitTextDirective],
    imports: [
        CommonModule,
        DualViewTimerModule
    ],
})
export class RoundModule {
}
