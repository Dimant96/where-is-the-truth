import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {CommonQuestion} from '../../interfaces/question.interface';

@Component({
    selector: 'question',
    templateUrl: './question.component.html',
    styleUrls: ['./question.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionComponent {
    @Input() question: CommonQuestion;
}
