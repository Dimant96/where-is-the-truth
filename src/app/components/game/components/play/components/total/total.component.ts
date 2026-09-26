import {Component, ChangeDetectionStrategy, HostListener} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs/operators';
import {TeamsService} from '../../../../services/teams.service';
import {GameFlowService} from '../../../../services/game-flow.service';
import {GameStep} from '../../../../interfaces/game-step.interface';
import {isHotkey} from '../../../../services/constants/hotkeys.const';

@Component({
    selector: 'app-total',
    templateUrl: './total.component.html',
    styleUrls: ['./total.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TotalComponent {
    readonly totals$ = this.teamsService.teams$.pipe(
        map(teams => teams.map(team => ({
            name: team.name,
            total: this.teamsService.totalScore(team, this.round),
        }))),
    );

    constructor(
        private teamsService: TeamsService,
        private activatedRoute: ActivatedRoute,
        private gameFlowService: GameFlowService,
    ) {
    }

    get round(): number {
        return +this.activatedRoute.parent.snapshot.params.round;
    }

    get step(): GameStep {
        return {kind: 'total', round: this.round};
    }

    @HostListener('document:keydown', ['$event'])
    keydown(event: KeyboardEvent) {
        if (isHotkey(event, 'next')) {
            this.gameFlowService.next(this.step);
        } else if (isHotkey(event, 'prev')) {
            this.gameFlowService.prev(this.step);
        }
    }
}
