import {Component} from '@angular/core';
import {TeamsService} from '../../services/teams.service';
import {map} from 'rxjs/operators';

@Component({
    selector: 'app-end',
    templateUrl: './end.component.html',
    styleUrls: ['./end.component.less']
})
export class EndComponent {
    winnerTeam$ = this.teamsService.teams$.pipe(
        map(teams => teams.sort((first, second) => first.score - second.score)[0])
    );

    constructor(private teamsService: TeamsService) {}
}
