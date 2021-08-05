import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PlayComponent} from './play.component';
import {PlayRoutingModule} from './play-routing.module';
import {QuestionModule} from './components/question/question.module';
import {QuestionWithTimerModule} from './components/question-with-timer/question-with-timer.module';
import {TimerModule} from './components/timer/timer.module';

@NgModule({
    declarations: [PlayComponent],
    imports: [
        CommonModule,
        PlayRoutingModule,
        QuestionModule,
        QuestionWithTimerModule,
        TimerModule,
    ]
})
export class PlayModule {
}
