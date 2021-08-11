import {Component, OnInit, ChangeDetectionStrategy, HostListener} from '@angular/core';
import {TeamsService} from '../../services/teams.service';
import {GameNavigationService} from '../../services/game-navigation.service';

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WelcomeComponent implements OnInit {
    @HostListener('document:keydown.ArrowRight')
    keydownArrowRight() {
        this.gameNavigationService.goToStart();
    }

    constructor(private teamsService: TeamsService, private gameNavigationService: GameNavigationService) {}

    ngOnInit() {
        this.teamsService.resetTeams();
    }
}
