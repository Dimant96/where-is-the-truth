import {Injectable} from '@angular/core';
import {BehaviorSubject, of, timer} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {timerInterval} from './constants/timer-interval.const';

@Injectable()
export class TimerService {
    private isTimerWorked$ = new BehaviorSubject<boolean>(false);

    readonly timer$ = this.isTimerWorked$
        .asObservable()
        .pipe(
            switchMap(isWorked => isWorked ? timer(0, timerInterval) : of(0)),
            map(time => time * timerInterval),
        );

    get isTimerWorked(): boolean {
        return this.isTimerWorked$.value;
    }

    stop() {
        this.isTimerWorked$.next(false);
    }

    start() {
        this.isTimerWorked$.next(true);
    }
}
