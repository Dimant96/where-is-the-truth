import {Pipe, PipeTransform} from '@angular/core';
import {getDualTime} from '../utils/get-dual-time.utils';

const mSecondsInSeconds = 1000;
const secondsInMinutes = 60;

@Pipe({
    name: 'dualViewTimer'
})
export class DualViewTimerPipe implements PipeTransform {
    transform(accumulatedTime: number, timer: number): string {
        const allMs = timer - accumulatedTime;

        if (allMs < 0) {
            return '00:00:00';
        }

        const mSeconds = Math.floor(allMs % mSecondsInSeconds / 10);
        const seconds = Math.floor(allMs % (secondsInMinutes * mSecondsInSeconds) / mSecondsInSeconds);
        const minutes = Math.floor(allMs / (secondsInMinutes * mSecondsInSeconds));

        return `${getDualTime(minutes)}:${getDualTime(seconds)}:${getDualTime(mSeconds)}`;
    }
}
