import {Injectable} from '@angular/core';
import {Subject, timer} from 'rxjs';
import {map, repeatWhen, take, takeUntil} from 'rxjs/operators';
import {timerInterval} from './constants/timer-interval.const';

@Injectable({
    providedIn: 'root'
})
export class TimerService {
    private stopSignal$ = new Subject();
    private startSignal$ = new Subject();
    private accumulatedTime = 0;

    readonly timer$ = timer(0, timerInterval).pipe(
        map(time => this.accumulatedTime + time * timerInterval),
        takeUntil(this.stopSignal$),
        repeatWhen(() => this.startSignal$)
    );

    pause() {
        this.timer$.pipe(take(1)).subscribe(accumulatedTime => {
            this.accumulatedTime = accumulatedTime;
        });
        this.stopSignal$.next();
    }

    start() {
        this.startSignal$.next();
    }

    reset() {
        this.accumulatedTime = 0;
        this.stopSignal$.next();
        this.start();
    }
}
