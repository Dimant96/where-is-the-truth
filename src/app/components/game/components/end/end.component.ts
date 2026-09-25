import {Component, HostListener, OnInit} from '@angular/core';
import {GameFlowService} from '../../services/game-flow.service';
import {GameStep} from '../../interfaces/game-step.interface';

const step: GameStep = {kind: 'end'};

@Component({
    selector: 'app-end',
    templateUrl: './end.component.html',
    styleUrls: ['./end.component.less']
})
export class EndComponent implements OnInit {
    constructor(private gameFlowService: GameFlowService) {}

    // While the winner field has the cursor, arrows move through the text instead of the slides.
    @HostListener('document:keydown.ArrowRight', ['$event'])
    keydownArrowRight(event: KeyboardEvent) {
        if (!isTyping(event)) {
            this.gameFlowService.next(step);
        }
    }

    @HostListener('document:keydown.ArrowLeft', ['$event'])
    keydownArrowLeft(event: KeyboardEvent) {
        if (!isTyping(event)) {
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
