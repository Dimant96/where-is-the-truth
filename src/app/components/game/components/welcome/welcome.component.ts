import {Component, OnInit, ChangeDetectionStrategy, HostListener} from '@angular/core';
import {GameFlowService} from '../../services/game-flow.service';
import {GameStep} from '../../interfaces/game-step.interface';
import {isHotkey} from '../../services/constants/hotkeys.const';

const step: GameStep = {kind: 'welcome'};

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WelcomeComponent implements OnInit {
    @HostListener('document:keydown', ['$event'])
    keydown(event: KeyboardEvent) {
        if (isHotkey(event, 'next')) {
            this.gameFlowService.next(step);
        } else if (isHotkey(event, 'prev')) {
            this.gameFlowService.prev(step);
        }
    }

    constructor(private gameFlowService: GameFlowService) {}

    ngOnInit() {
        this.gameFlowService.enter(step);
    }
}
