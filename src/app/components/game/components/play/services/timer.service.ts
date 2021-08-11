import {Injectable} from '@angular/core';
import {Subject, timer} from 'rxjs';
import {map, repeatWhen, takeUntil} from 'rxjs/operators';
import {timerInterval} from './constants/timer-interval.const';

@Injectable({
    providedIn: 'root'
})
export class TimerService {
    private stopSignal$ = new Subject();
    private startSignal$ = new Subject();

    readonly timer$ = timer(0, timerInterval).pipe(
        map(time => time * timerInterval),
        takeUntil(this.stopSignal$),
        repeatWhen(() => this.startSignal$)
    );

    stop() {
        this.stopSignal$.next();
    }

    start() {
        this.startSignal$.next();
    }

    reset() {
        this.stop();
        this.start();
    }
}
