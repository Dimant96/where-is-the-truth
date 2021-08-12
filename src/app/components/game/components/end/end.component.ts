import {Component} from '@angular/core';
import {TeamsService} from '../../services/teams.service';
import {map} from 'rxjs/operators';
import {getWinnerTeam} from './utils/get-winner-team';

@Component({
    selector: 'app-end',
    templateUrl: './end.component.html',
    styleUrls: ['./end.component.less']
})
export class EndComponent {
    winnerTeam$ = this.teamsService.teams$.pipe(map(getWinnerTeam));

    constructor(private teamsService: TeamsService) {}
}
