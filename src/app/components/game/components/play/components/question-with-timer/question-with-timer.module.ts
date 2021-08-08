import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionWithTimerComponent } from './question-with-timer.component';
import {DualViewTimerModule} from '../../pipe/dual-view-timer/dual-view-timer.module';

@NgModule({
    declarations: [QuestionWithTimerComponent],
    exports: [
        QuestionWithTimerComponent
    ],
    imports: [
        CommonModule,
        DualViewTimerModule,
    ]
})
export class QuestionWithTimerModule { }
