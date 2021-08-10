import {Component, ChangeDetectionStrategy, HostListener} from '@angular/core';
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

    @HostListener('document:keydown.ArrowRight')
    keydownArrowRight() {
        this.roundService.goToQuestion(this.round, this.question + 1);
    }

    @HostListener('document:keydown.ArrowLeft')
    keydownArrowLeft() {
        if (this.question === 0) {
            this.roundService.goToPreview(this.round);

            return;
        }

        this.roundService.goToQuestion(this.round, this.question - 1);
    }

    constructor(
        private roundService: RoundService,
        private teamsService: TeamsService,
        private activatedRoute: ActivatedRoute,
    ) {
    }

    get round(): number {
        return +this.activatedRoute.parent.snapshot.params.round;
    }

    get question(): number {
        return +this.activatedRoute.snapshot.params.question;
    }
}
