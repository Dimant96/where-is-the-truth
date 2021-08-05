import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import {Round} from '../../services/interfaces/round.interface';

@Component({
    selector: 'question',
    templateUrl: './question.component.html',
    styleUrls: ['./question.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionComponent implements OnInit {
    @Input() round: Round;

    constructor() {
    }

    ngOnInit(): void {
    }

}
