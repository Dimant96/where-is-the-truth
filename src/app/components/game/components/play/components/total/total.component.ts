import {Component, ChangeDetectionStrategy, HostListener} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs/operators';
import {TeamsService} from '../../../../services/teams.service';
import {GameFlowService} from '../../../../services/game-flow.service';
import {GameStep} from '../../../../interfaces/game-step.interface';

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

    @HostListener('document:keydown.ArrowRight')
    keydownArrowRight() {
        this.gameFlowService.next(this.step);
    }

    @HostListener('document:keydown.ArrowLeft')
    keydownArrowLeft() {
        this.gameFlowService.prev(this.step);
    }
}
