import rounds from '../../../../../../assets/rounds.json';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Round} from '../interfaces/round.interface';
import {TimerService} from './timer.service';
import {Params, Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class RoundService {
    constructor(
        private timerService: TimerService,
        private router: Router,
    ) {
    }

    get timer$(): Observable<number> {
        return this.timerService.timer$;
    }

    getRound({round}: Params): Round {
        return rounds[round] as Round;
    }

    pauseTimer() {
        this.timerService.pause();
    }

    startTimer() {
        this.timerService.start();
    }

    resetTimer() {
        this.timerService.reset();
    }

    isLastRound(round: number): boolean {
        return round === rounds.length - 1;
    }

    goToQuestion(round: number, question: number) {
        const questionsLength = (rounds[round] as Round)
            .questions
            .length;

        this.resetTimer();

        if (question < questionsLength) {
            this.router.navigate(['play', round, question]);

            return;
        }

        this.router.navigate(['play', round, 'result']);
    }

    goToLastQuestion(round: number) {
        const lastQuestionNumber = this.getRound({round}).questions.length - 1;

        this.router.navigate(['play', round, lastQuestionNumber]);
    }

    goToResult(round: number) {
        this.router.navigate(['play', round, 'result']);
    }

    goToPreview(round: number) {
        this.router.navigate(['play', round, 'preview']);
    }

    goToStart() {
        this.router.navigate(['start']);
    }

    goToEnd() {
        this.router.navigate(['end']);
    }
}
