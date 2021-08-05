import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import {Round} from '../../services/interfaces/round.interface';

@Component({
    selector: 'timer',
    templateUrl: './timer.component.html',
    styleUrls: ['./timer.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimerComponent implements OnInit {
    @Input() round: Round;

    constructor() {
    }

    ngOnInit(): void {
    }

}
