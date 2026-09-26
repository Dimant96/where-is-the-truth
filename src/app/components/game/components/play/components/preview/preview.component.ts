import {Component, ChangeDetectionStrategy, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RoundService} from '../../services/round.service';
import {map} from 'rxjs/operators';
import {GameFlowService} from '../../../../services/game-flow.service';
import {GameStep} from '../../../../interfaces/game-step.interface';
import {isHotkey} from '../../../../services/constants/hotkeys.const';
import settings from '../../../../../../../assets/settings.json';

const defaultStageWord = 'Этап';
const configuredStageWord = (settings as {stageWord?: unknown}).stageWord;

@Component({
    selector: 'app-preview',
    templateUrl: './preview.component.html',
    styleUrls: ['./preview.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewComponent implements OnInit {
    readonly stageWord = typeof configuredStageWord === 'string' && configuredStageWord.trim()
        ? configuredStageWord.trim()
        : defaultStageWord;
    readonly roundNumber$ = this.activatedRoute.parent.params.pipe(map(({round}) => +round));
    readonly round$ = this.activatedRoute
        .parent
        .params
        .pipe(map(({round}) => this.roundService.getRound(round)));

    @HostListener('document:keydown', ['$event'])
    keydown(event: KeyboardEvent) {
        if (isHotkey(event, 'next')) {
            this.gameFlowService.next(this.step);
        } else if (isHotkey(event, 'prev')) {
            this.gameFlowService.prev(this.step);
        }
    }

    constructor(
        private activatedRoute: ActivatedRoute,
        private roundService: RoundService,
        private gameFlowService: GameFlowService,
    ) {}

    ngOnInit() {
        this.gameFlowService.enter(this.step);
    }

    get step(): GameStep {
        return {kind: 'preview', round: this.round};
    }

    get round(): number {
        return +this.activatedRoute.parent.snapshot.params.round;
    }
}
