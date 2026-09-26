import {Component, HostListener, OnInit} from '@angular/core';
import {GameFlowService} from '../../services/game-flow.service';
import {GameStep} from '../../interfaces/game-step.interface';
import {isHotkey} from '../../services/constants/hotkeys.const';
import {gameFlow} from '../../services/constants/game-flow.const';

const step: GameStep = {kind: 'end'};

@Component({
    selector: 'app-end',
    templateUrl: './end.component.html',
    styleUrls: ['./end.component.less']
})
export class EndComponent implements OnInit {
    readonly hasInput = gameFlow.endInput;

    constructor(private gameFlowService: GameFlowService) {}

    // While the winner field has the cursor, every key belongs to the text (arrows move through it)
    // instead of the slides.
    @HostListener('document:keydown', ['$event'])
    keydown(event: KeyboardEvent) {
        if (isTyping(event)) {
            return;
        }

        if (isHotkey(event, 'next')) {
            this.gameFlowService.next(step);
        } else if (isHotkey(event, 'prev')) {
            this.gameFlowService.prev(step);
        }
    }

    ngOnInit() {
        this.gameFlowService.enter(step);
    }
}

function isTyping(event: KeyboardEvent): boolean {
    return event.target instanceof HTMLTextAreaElement;
}
