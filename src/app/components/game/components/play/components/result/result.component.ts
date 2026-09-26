import {Component, ChangeDetectionStrategy, HostListener} from '@angular/core';
import {TeamsService} from '../../../../services/teams.service';
import {ActivatedRoute} from '@angular/router';
import {GameFlowService} from '../../../../services/game-flow.service';
import {GameStep} from '../../../../interfaces/game-step.interface';
import {isHotkey} from '../../../../services/constants/hotkeys.const';

@Component({
    selector: 'app-result',
    templateUrl: './result.component.html',
    styleUrls: ['./result.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultComponent {
    readonly teams$ = this.teamsService.teams$;

    constructor(
        private teamsService: TeamsService,
        private activatedRoute: ActivatedRoute,
        private gameFlowService: GameFlowService,
    ) {
    }

    get step(): GameStep {
        return {kind: 'result', round: +this.activatedRoute.parent.snapshot.params.round};
    }

    @HostListener('document:keydown', ['$event'])
    keydown(event: KeyboardEvent) {
        if (isHotkey(event, 'next')) {
            this.gameFlowService.next(this.step);
        } else if (isHotkey(event, 'prev')) {
            this.gameFlowService.prev(this.step);
        } else if (isHotkey(event, 'team1')) {
            this.teamsService.bumpWinnerTeam(0);
        } else if (isHotkey(event, 'team2')) {
            this.teamsService.bumpWinnerTeam(1);
        }
    }
}
