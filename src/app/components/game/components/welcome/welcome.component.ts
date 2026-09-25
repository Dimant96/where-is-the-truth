import {Component, OnInit, ChangeDetectionStrategy, HostListener} from '@angular/core';
import {GameFlowService} from '../../services/game-flow.service';
import {GameStep} from '../../interfaces/game-step.interface';

const step: GameStep = {kind: 'welcome'};

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WelcomeComponent implements OnInit {
    @HostListener('document:keydown.ArrowRight')
    keydownArrowRight() {
        this.gameFlowService.next(step);
    }

    @HostListener('document:keydown.ArrowLeft')
    keydownArrowLeft() {
        this.gameFlowService.prev(step);
    }

    constructor(private gameFlowService: GameFlowService) {}

    ngOnInit() {
        this.gameFlowService.enter(step);
    }
}
