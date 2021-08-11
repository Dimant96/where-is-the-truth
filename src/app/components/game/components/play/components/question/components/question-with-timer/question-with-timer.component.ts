import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {Round} from '../../../../interfaces/round.interface';

@Component({
    selector: 'question-with-timer',
    templateUrl: './question-with-timer.component.html',
    styleUrls: ['./question-with-timer.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionWithTimerComponent {
    @Input() round: Round;
    @Input() questionNumber: number;
    @Input() isQuestionHide: boolean;
    @Input() timer: number;
}
