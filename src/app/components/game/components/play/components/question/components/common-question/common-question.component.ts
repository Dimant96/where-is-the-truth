import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {CommonQuestion} from '../../../../interfaces/question.interface';

@Component({
  selector: 'common-question',
  templateUrl: './common-question.component.html',
  styleUrls: ['./common-question.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommonQuestionComponent {
    @Input() question: CommonQuestion;
}
