import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {TeamsService} from '../../services/teams.service';

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WelcomeComponent implements OnInit {
    constructor(private teamsService: TeamsService) {}

    ngOnInit() {
        this.teamsService.resetTeams();
    }
}
