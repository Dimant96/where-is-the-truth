// @ts-ignore
import rounds from '../../../../../../assets/rounds.json';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Round} from '../interfaces/round.interface';
import {map} from 'rxjs/operators';
import {TimerService} from './timer.service';

@Injectable({
    providedIn: 'root'
})
export class RoundService {
    private roundNumberStore$ = new BehaviorSubject(0);
    private questionNumberStore$ = new BehaviorSubject(0);

    get round$(): Observable<Round> {
        return this.roundNumberStore$.pipe(
            map(selectedRound => rounds[selectedRound] as Round),
        );
    }

    get questionNumber$(): Observable<number> {
        return this.questionNumberStore$.asObservable();
    }

    get timer$(): Observable<number> {
        return this.timerService.timer$;
    }

    constructor(private timerService: TimerService) {
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

    nextQuestion() {
        const selectedRound = this.roundNumberStore$.value;
        const questionsLength = (rounds[selectedRound] as Round)
            .questions
            .length;
        const nextSelectedQuestion = this.questionNumberStore$.value + 1;

        this.resetTimer();

        if (nextSelectedQuestion < questionsLength) {
            this.questionNumberStore$.next(nextSelectedQuestion);

            return;
        }

        this.questionNumberStore$.next(0);
        this.roundNumberStore$.next(selectedRound + 1);
    }
}
