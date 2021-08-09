import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {Timer} from '../../../../interfaces/question.interface';

@Component({
    selector: 'timer',
    templateUrl: './timer.component.html',
    styleUrls: ['./timer.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimerComponent {
    @Input() question: Timer;
    @Input() timer: number;
}
