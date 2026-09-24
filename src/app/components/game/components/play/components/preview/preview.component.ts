import {Component, ChangeDetectionStrategy, HostListener} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RoundService} from '../../services/round.service';
import {map} from 'rxjs/operators';
import {GameNavigationService} from '../../../../services/game-navigation.service';
import settings from '../../../../../../../assets/settings.json';

const defaultStageWord = 'Этап';
const configuredStageWord = (settings as {stageWord?: unknown}).stageWord;

@Component({
    selector: 'app-preview',
    templateUrl: './preview.component.html',
    styleUrls: ['./preview.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewComponent {
    readonly stageWord = typeof configuredStageWord === 'string' && configuredStageWord.trim()
        ? configuredStageWord.trim()
        : defaultStageWord;
    readonly roundNumber$ = this.activatedRoute.parent.params.pipe(map(({round}) => +round));
    readonly round$ = this.activatedRoute
        .parent
        .params
        .pipe(map(({round}) => this.roundService.getRound(round)));

    @HostListener('document:keydown.ArrowRight')
    keydownArrowRight() {
        this.gameNavigationService.goToQuestion(this.round, 0);
    }

    @HostListener('document:keydown.ArrowLeft')
    keydownArrowLeft() {
        if (this.roundService.isFirsRound(this.round)) {
            this.gameNavigationService.goToStart();
            return;
        }

        this.gameNavigationService.goToResult(this.round - 1);
    }

    constructor(
        private activatedRoute: ActivatedRoute,
        private roundService: RoundService,
        private gameNavigationService: GameNavigationService,
    ) {}

    get round(): number {
        return +this.activatedRoute.parent.snapshot.params.round;
    }
}
