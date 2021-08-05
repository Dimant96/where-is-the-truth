import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionWithTimerComponent } from './question-with-timer.component';

@NgModule({
    declarations: [QuestionWithTimerComponent],
    exports: [
        QuestionWithTimerComponent
    ],
    imports: [
        CommonModule
    ]
})
export class QuestionWithTimerModule { }
