import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DualViewTimerPipe } from './dual-view-timer.pipe';



@NgModule({
    declarations: [DualViewTimerPipe],
    exports: [
        DualViewTimerPipe
    ],
    imports: [
        CommonModule
    ]
})
export class DualViewTimerModule { }
