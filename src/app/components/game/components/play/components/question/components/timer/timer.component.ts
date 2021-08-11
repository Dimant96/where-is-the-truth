import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {Round} from '../../../../interfaces/round.interface';

@Component({
    selector: 'timer',
    templateUrl: './timer.component.html',
    styleUrls: ['./timer.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimerComponent {
    @Input() round: Round;
    @Input() timer: number;
}
