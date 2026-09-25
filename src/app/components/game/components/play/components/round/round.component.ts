import {Component, OnInit, OnDestroy, ChangeDetectionStrategy, HostListener} from '@angular/core';
import {RoundService} from '../../services/round.service';
import {TeamsService} from '../../../../services/teams.service';
import {ActivatedRoute} from '@angular/router';
import {GameNavigationService} from '../../../../services/game-navigation.service';
import {GameFlowService} from '../../../../services/game-flow.service';
import {GameStep} from '../../../../interfaces/game-step.interface';
import {RoundType} from '../../enums/round-type.enum';
import {distinctUntilChanged, map, tap} from 'rxjs/operators';
import {TimerService} from '../../services/timer.service';
import {Observable, Subscription} from 'rxjs';
import {playAudio} from '../../../../utils/play-audio';
import {AudioPath} from '../../../../enums/audio.enum';

@Component({
    selector: 'app-round',
    templateUrl: './round.component.html',
    styleUrls: ['./round.component.less'],
    providers: [TimerService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoundComponent implements OnInit, OnDestroy {
    readonly questionRound = RoundType.Question;
    readonly questionWithTimerRound = RoundType.QuestionWithTimer;
    readonly timerRound = RoundType.Timer;

    readonly teams$ = this.teamsService.teams$;
    readonly timer$ = this.timerService.timer$.pipe(
        tap(timer => {
            const roundTimer = this.roundService.getRound(this.round).timer;
            const isTimerEnd = roundTimer ? !(roundTimer - timer) : false;

            if (isTimerEnd) {
                playAudio(AudioPath.EndTimer);
            }
        })
    );
    readonly questionNumber$ = this.activatedRoute
        .params
        .pipe(map(({question}) => question));
    readonly round$ = this.activatedRoute
        .parent
        .params
        .pipe(map(({round}) => this.roundService.getRound(round)));

    isWaitingResponse = false;
    isRoundStart = false;

    private roundSubscription: Subscription;

    constructor(
        private roundService: RoundService,
        private teamsService: TeamsService,
        private activatedRoute: ActivatedRoute,
        private timerService: TimerService,
        private gameNavigationService: GameNavigationService,
        private gameFlowService: GameFlowService,
    ) {}

    get questionNumberFromParams$(): Observable<number> {
        return this.activatedRoute
            .params
            .pipe(map(({question}) => question));
    }

    @HostListener('document:keydown.ArrowRight')
    keydownArrowRight() {
        this.teamsService.commitRoundScore(this.round);
        this.gameFlowService.next(this.step);
    }

    @HostListener('document:keydown.ArrowLeft')
    keydownArrowLeft() {
        this.teamsService.commitRoundScore(this.round);
        this.gameFlowService.prev(this.step);
    }

    @HostListener('document:keydown.g')
    @HostListener('document:keydown.п')
    keyDownG() {
        this.teamsService.toggleRespondingTeamMode();
    }

    @HostListener('document:keydown.t')
    @HostListener('document:keydown.е')
    keyDownT() {
        if (this.teamsService.isTakeTurnsGame) {
            this.teamsService.toggleRespondingTeam();
        }
    }

    @HostListener('document:keydown.r')
    @HostListener('document:keydown.к')
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

        playAudio(AudioPath.WinQuestion);

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
            playAudio(AudioPath.LoseQuestion);
            return;
        }

        playAudio(AudioPath.WinQuestion);
        this.teamsService.bumpScore(1);
    }

    ngOnInit() {
        if (this.teamsService.isTakeTurnsGame) {
            this.teamsService.toggleRespondingTeamMode();
        }

        // Without a preview or a slide after it, one stage follows another on the same component,
        // so every new stage starts over here rather than in the constructor.
        this.roundSubscription = this.activatedRoute
            .parent
            .params
            .pipe(
                map(({round}) => +round),
                distinctUntilChanged(),
            )
            .subscribe(round => {
                this.gameFlowService.enter(this.step);
                this.teamsService.startRoundScore(round);
                this.timerService.stop();
                this.isWaitingResponse = false;
                this.isRoundStart = false;
            });
    }

    ngOnDestroy() {
        this.roundSubscription.unsubscribe();
    }

    get step(): GameStep {
        return {kind: 'round', round: this.round};
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
