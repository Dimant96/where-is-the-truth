import {Component, ChangeDetectionStrategy} from '@angular/core';
import {RoundType} from '../../enums/round-type.enum';
import {map} from 'rxjs/operators';
import {RoundService} from '../../services/round.service';
import {TeamsService} from '../../../../services/teams.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'question',
    templateUrl: './question.component.html',
    styleUrls: ['./question.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionComponent {
    readonly questionRound = RoundType.Question;
    readonly questionWithTimerRound = RoundType.QuestionWithTimer;
    readonly timerRound = RoundType.Timer;

    readonly teams$ = this.teamsService.teams$;
    readonly timer$ = this.roundService.timer$;
    readonly round$ = this.activatedRoute.parent.params.pipe(map(this.roundService.getRound));
    readonly questionNumber$ = this.activatedRoute.params.pipe(map(({question}) => question));

    constructor(
        private roundService: RoundService,
        private teamsService: TeamsService,
        private activatedRoute: ActivatedRoute,
    ) {
    }

    nextQuestion() {
        const round = +this.activatedRoute.parent.snapshot.params.round;
        const question = +this.activatedRoute.snapshot.params.question;

        this.roundService.nextQuestion(round, question);
    }
}
