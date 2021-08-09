import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {CommonQuestionWithTimer} from '../../../../interfaces/question.interface';

@Component({
    selector: 'question-with-timer',
    templateUrl: './question-with-timer.component.html',
    styleUrls: ['./question-with-timer.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionWithTimerComponent {
    @Input() question: CommonQuestionWithTimer;
    @Input() timer: number;
}
