import {Component, OnInit, ChangeDetectionStrategy, HostListener} from '@angular/core';
import {RoundService} from '../../services/round.service';
import {TeamsService} from '../../../../services/teams.service';
import {ActivatedRoute} from '@angular/router';
import {GameNavigationService} from '../../../../services/game-navigation.service';
import {RoundType} from '../../enums/round-type.enum';
import {map} from 'rxjs/operators';
import {TimerService} from '../../services/timer.service';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-round',
    templateUrl: './round.component.html',
    styleUrls: ['./round.component.less'],
    providers: [TimerService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoundComponent implements OnInit {
    readonly questionRound = RoundType.Question;
    readonly questionWithTimerRound = RoundType.QuestionWithTimer;
    readonly timerRound = RoundType.Timer;

    readonly teams$ = this.teamsService.teams$;
    readonly timer$ = this.timerService.timer$;
    readonly questionNumber$ = this.activatedRoute
        .params
        .pipe(map(({question}) => question));
    readonly round$ = this.activatedRoute
        .parent
        .params
        .pipe(map(({round}) => this.roundService.getRound(round)));

    isWaitingResponse = false;
    isRoundStart = false;

    constructor(
        private roundService: RoundService,
        private teamsService: TeamsService,
        private activatedRoute: ActivatedRoute,
        private timerService: TimerService,
        private gameNavigationService: GameNavigationService,
    ) {}

    get questionNumberFromParams$(): Observable<number> {
        return this.activatedRoute
            .params
            .pipe(map(({question}) => question));
    }

    @HostListener('document:keydown.ArrowRight')
    keydownArrowRight() {
        this.teamsService.resetScore();
        this.gameNavigationService.goToResult(this.round);
    }

    @HostListener('document:keydown.ArrowLeft')
    keydownArrowLeft() {
        this.gameNavigationService.goToPreview(this.round);
    }

    @HostListener('document:keydown.g')
    keyDownG() {
        this.teamsService.toggleRespondingTeamMode();
    }

    @HostListener('document:keydown.t')
    keyDownT() {
        if (this.teamsService.isTakeTurnsGame) {
            this.teamsService.toggleRespondingTeam();
        }
    }

    @HostListener('document:keydown.r')
    keyDownR() {
        this.timerService.stop();
    }

    @HostListener('document:keydown.space')
    keyDownSpace() {
        if (!this.timerService.isTimerWorked) {
            this.timerService.start();
        }

        if (this.isWaitingResponse) {
            return;
        }

        this.isWaitingResponse = true;

        if (!this.isRoundStart) {
            this.isRoundStart = true;
            return;
        }

        if (this.roundService.isAllQuestionsResolve(this.round, this.question)) {
            return;
        }

        this.gameNavigationService.goToQuestion(this.round, this.question + 1);
    }

    @HostListener('document:keydown.1')
    keyDown1() {
        const isRoundWithQuestion = this.roundService.isRoundHasQuestion(this.round);

        if (isRoundWithQuestion) {
            if (this.roundService.isAllQuestionsResolve(this.round, this.question)) {
                return;
            }

            this.isWaitingResponse = false;
        }

        if (this.teamsService.isTakeTurnsGame) {
            this.teamsService.bumpScoreReasonsTeam();
            return;
        }

        this.teamsService.bumpScore(0);
    }

    @HostListener('document:keydown.2')
    keyDown2() {
        const isRoundWithQuestion = this.roundService.isRoundHasQuestion(this.round);

        if (isRoundWithQuestion) {
            if (this.roundService.isAllQuestionsResolve(this.round, this.question)) {
                return;
            }

            this.isWaitingResponse = false;
        }

        if (this.teamsService.isTakeTurnsGame) {
            return;
        }

        this.teamsService.bumpScore(1);
    }

    ngOnInit(): void {
    }

    get round(): number {
        return +this.activatedRoute.parent.snapshot.params.round;
    }

    get question(): number {
        return +this.activatedRoute.snapshot.params.question;
    }

    isTeamBlur(teamNumber: number): boolean {
        return this.teamsService.isTakeTurnsGame ? this.teamsService.isRespondingTeam(teamNumber) : false;
    }
}
