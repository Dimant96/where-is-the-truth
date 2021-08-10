import {Component, ChangeDetectionStrategy, HostListener} from '@angular/core';
import {TeamsService} from '../../../../services/teams.service';
import {ActivatedRoute} from '@angular/router';
import {RoundService} from '../../services/round.service';

@Component({
    selector: 'app-result',
    templateUrl: './result.component.html',
    styleUrls: ['./result.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultComponent {
    readonly teams$ = this.teamsService.teams$;

    @HostListener('document:keydown.ArrowRight')
    keydownArrowRight() {
        if (this.roundService.isLastRound(this.round)) {
            this.roundService.goToEnd();

            return;
        }

        this.roundService.goToPreview(this.round + 1);
    }

    @HostListener('document:keydown.ArrowLeft')
    keydownArrowLeft() {
        this.roundService.goToLastQuestion(this.round);
    }

    constructor(
        private teamsService: TeamsService,
        private activatedRoute: ActivatedRoute,
        private roundService: RoundService,
    ) {
    }

    get round(): number {
        return +this.activatedRoute.parent.snapshot.params.round;
    }
}
