import {Component, ChangeDetectionStrategy, HostListener} from '@angular/core';
import {TeamsService} from '../../../../services/teams.service';
import {ActivatedRoute} from '@angular/router';
import {RoundService} from '../../services/round.service';
import {GameNavigationService} from '../../../../services/game-navigation.service';

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
        private roundService: RoundService,
        private gameNavigationService: GameNavigationService
    ) {
    }

    get round(): number {
        return +this.activatedRoute.parent.snapshot.params.round;
    }

    @HostListener('document:keydown.ArrowRight')
    keydownArrowRight() {
        if (this.roundService.isLastRound(this.round)) {
            this.gameNavigationService.goToEnd();
            return;
        }

        this.gameNavigationService.goToPreview(this.round + 1);
    }

    @HostListener('document:keydown.ArrowLeft')
    keydownArrowLeft() {
        this.gameNavigationService.goToPreview(this.round);
    }

    @HostListener('document:keydown.1')
    keyDown1() {
        this.teamsService.bumpWinnerTeam(0);
    }

    @HostListener('document:keydown.2')
    keyDown2() {
        this.teamsService.bumpWinnerTeam(1);
    }
}
