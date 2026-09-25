import {Component, ChangeDetectionStrategy, Input, HostBinding} from '@angular/core';
import {Round} from '../../../../interfaces/round.interface';
import {questionBoxStyle} from '../../constants/question-box.const';

@Component({
  selector: 'common-question',
  templateUrl: './common-question.component.html',
  styleUrls: ['./common-question.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommonQuestionComponent {
    @Input() round: Round;
    @Input() questionNumber: number;
    @Input() isQuestionHide: boolean;

    readonly boxStyle = questionBoxStyle;

    @HostBinding('class.img')
    get isImg(): boolean {
        return !!this.round.questions[this.questionNumber]?.image;
    }
}
