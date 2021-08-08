import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TimerComponent} from './timer.component';
import {DualViewTimerModule} from '../../pipe/dual-view-timer/dual-view-timer.module';

@NgModule({
    declarations: [TimerComponent],
    exports: [
        TimerComponent
    ],
    imports: [
        CommonModule,
        DualViewTimerModule,
    ]
})
export class TimerModule {
}
