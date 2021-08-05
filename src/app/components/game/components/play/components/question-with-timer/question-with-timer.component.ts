import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import {Round} from '../../services/interfaces/round.interface';

@Component({
    selector: 'question-with-timer',
    templateUrl: './question-with-timer.component.html',
    styleUrls: ['./question-with-timer.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionWithTimerComponent implements OnInit {
    @Input() round: Round;

    constructor() {
    }

    ngOnInit(): void {
    }

}
