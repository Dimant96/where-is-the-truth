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
    ) {}

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

    nextQuestion(round: number, question: number) {
        const questionsLength = (rounds[round] as Round)
            .questions
            .length;
        const nextQuestionNumber = question + 1;

        this.resetTimer();

        if (nextQuestionNumber < questionsLength) {
            this.router.navigate(['play', round, nextQuestionNumber]);

            return;
        }

        this.router.navigate(['play', round + 1, 0]);
    }
}
