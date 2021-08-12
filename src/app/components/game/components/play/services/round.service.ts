import rounds from '../../../../../../assets/rounds.json';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Round} from '../interfaces/round.interface';
import {TimerService} from './timer.service';
import {Params} from '@angular/router';
import {RoundType} from '../enums/round-type.enum';
import {GameNavigationService} from '../../../services/game-navigation.service';

// const roundsWithoutQuestion: RoundType[] = [RoundType.Timer];

@Injectable({
    providedIn: 'root'
})
export class RoundService {
    private isQuestionHideStore$ = new BehaviorSubject<boolean>(true);

    constructor(
        private timerService: TimerService,
        private gameNavigationService: GameNavigationService,
    ) {
    }

    get timer$(): Observable<number> {
        setTimeout(() => this.timerService.stop(), 0);

        return this.timerService.timer$;
    }

    get isQuestionHide(): boolean {
        return this.isQuestionHideStore$.value;
    }

    get isQuestionHide$(): Observable<boolean> {
        return this.isQuestionHideStore$.asObservable();
    }

    getRound({round}: Params): Round {
        return rounds[round] as Round;
    }

    startTimer() {
        this.timerService.start();
    }

    stopTimer() {
        this.timerService.stop();
    }

    resetTimer() {
        this.timerService.reset();
    }

    isLastRound(round: number): boolean {
        return round === rounds.length - 1;
    }

    isFirsRound(round: number): boolean {
        return round === 0;
    }

    isAllQuestionsResolve(round: number, question: number) {
        const lastQuestionNumber = this.getRound({round}).questions.length - 1;

        return question > lastQuestionNumber;
    }

    goToQuestion(round: number, question: number) {
        const questionsLength = this.getRound({round})
            .questions
            .length;

        if (question < questionsLength) {
            this.gameNavigationService.goToQuestion(round, question);
            return;
        }
    }

    toggleQuestionStatus(round: number) {
        const {type} = this.getRound({round});

        switch (type) {
            case RoundType.Question:
                break;
            case RoundType.QuestionWithTimer:
            case RoundType.Timer:
                this.toggleTimerStatus();

                break;
        }

        this.isQuestionHideStore$.next(!this.isQuestionHide);
    }

    private toggleTimerStatus() {
        if (this.isQuestionHide) {
            this.startTimer();

            return;
        }

        this.stopTimer();
    }
}
