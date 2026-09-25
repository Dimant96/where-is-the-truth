import {Component, OnInit, OnDestroy, ChangeDetectionStrategy, HostListener} from '@angular/core';
import {RoundService} from '../../services/round.service';
import {TeamsService} from '../../../../services/teams.service';
import {ActivatedRoute} from '@angular/router';
import {GameNavigationService} from '../../../../services/game-navigation.service';
import {GameFlowService} from '../../../../services/game-flow.service';
import {GameStep} from '../../../../interfaces/game-step.interface';
import {RoundType} from '../../enums/round-type.enum';
import {Round} from '../../interfaces/round.interface';
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
    readonly teamQuestionRound = RoundType.TeamQuestion;
    readonly teamQuestionWithTimerRound = RoundType.TeamQuestionWithTimer;

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

    // Team rounds: each team walks its own list. Whether Space has shown the team's first question yet,
    // and which of its questions is the current one, so switching teams back and forth resumes each list.
    private teamStarted = [false, false];
    private teamPositions = [0, 0];
    private teamView: {source: Round, team: number | null, view: Round} | null = null;

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
        this.hideOnTeamSwitch();
    }

    @HostListener('document:keydown.t')
    @HostListener('document:keydown.е')
    keyDownT() {
        if (this.teamsService.isTakeTurnsGame) {
            this.teamsService.toggleRespondingTeam();
            this.hideOnTeamSwitch();
        }
    }

    @HostListener('document:keydown.r')
    @HostListener('document:keydown.к')
    keyDownR() {
        this.timerService.stop();
    }

    @HostListener('document:keydown.space')
    keyDownSpace() {
        const team = this.teamsService.respondingTeam;

        // In a team round nothing is shown until one team is lit: there is no list to take a question from.
        if (this.isTeamRound && team === null) {
            return;
        }

        if (!this.timerService.isTimerWorked) {
            this.timerService.start();
        }

        if (this.isWaitingResponse) {
            return;
        }

        this.isWaitingResponse = true;

        if (this.isTeamRound) {
            if (!this.teamStarted[team]) {
                this.teamStarted[team] = true;
                return;
            }

            if (!this.roundService.isAllQuestionsResolve(this.round, this.teamPositions[team], team)) {
                this.teamPositions[team]++;
            }

            return;
        }

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
        if (!this.hideQuestion()) {
            return;
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
        if (!this.hideQuestion()) {
            return;
        }

        if (this.teamsService.isTakeTurnsGame) {
            playAudio(AudioPath.LoseQuestion);
            return;
        }

        playAudio(AudioPath.WinQuestion);
        this.teamsService.bumpScore(1);
    }

    // Takes the question off the screen without points or sound — e.g. when nobody answered.
    @HostListener('document:keydown.z')
    @HostListener('document:keydown.я')
    keyDownZ() {
        this.hideQuestion();
    }

    ngOnInit() {
        // Without a preview or a slide after it, one stage follows another on the same component,
        // so every new stage starts over here rather than in the constructor: both teams lit, lists from the top.
        this.roundSubscription = this.activatedRoute
            .parent
            .params
            .pipe(
                map(({round}) => +round),
                distinctUntilChanged(),
            )
            .subscribe(round => {
                if (this.teamsService.isTakeTurnsGame) {
                    this.teamsService.toggleRespondingTeamMode();
                }

                this.gameFlowService.enter(this.step);
                this.teamsService.startRoundScore(round);
                this.timerService.stop();
                this.isWaitingResponse = false;
                this.isRoundStart = false;
                this.teamStarted = [false, false];
                this.teamPositions = [0, 0];
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

    // The current question: in a team round the lit team's own place in its list, otherwise the one in the URL.
    get question(): number {
        if (this.isTeamRound) {
            const team = this.teamsService.respondingTeam;

            return team === null ? 0 : this.teamPositions[team];
        }

        return +this.activatedRoute.snapshot.params.question;
    }

    get isTeamRound(): boolean {
        return this.roundService.isTeamRound(this.round);
    }

    // What a team round's question box shows: the round with the lit team's list as its questions.
    // Cached, so the box gets a new object only when the round or the lit team changes.
    teamRound(round: Round): Round {
        const team = this.teamsService.respondingTeam;

        if (!this.teamView || this.teamView.source !== round || this.teamView.team !== team) {
            const questions = team === null ? [] : (round.teamQuestions || [])[team] || [];

            this.teamView = {source: round, team, view: {...round, questions}};
        }

        return this.teamView.view;
    }

    isTeamBlur(teamNumber: number): boolean {
        return this.teamsService.isTakeTurnsGame ? this.teamsService.isRespondingTeam(teamNumber) : false;
    }

    // Hides the question on screen; false once the questions in play have all been shown, when there is
    // nothing left to hide or to score. A round without questions (a plain timer) has nothing to hide.
    private hideQuestion(): boolean {
        const team = this.teamsService.respondingTeam;

        if (!this.roundService.isRoundHasQuestion(this.round, team)) {
            return true;
        }

        if (this.roundService.isAllQuestionsResolve(this.round, this.question, team)) {
            return false;
        }

        this.isWaitingResponse = false;

        return true;
    }

    // A team round never keeps a question on screen once another team (or both) is lit: it belongs to the old one.
    private hideOnTeamSwitch() {
        if (this.isTeamRound) {
            this.isWaitingResponse = false;
        }
    }
}
