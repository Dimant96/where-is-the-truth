import {Component, HostListener, OnInit} from '@angular/core';
import {RoundService} from './services/round.service';
import {TeamsService} from '../../services/teams.service';

@Component({
    selector: 'app-play',
    templateUrl: './play.component.html',
    styleUrls: ['./play.component.less']
})
export class PlayComponent implements OnInit {
    teams$ = this.teamsService.teams$;

    constructor(private roundService: RoundService, private teamsService: TeamsService) {
    }

    ngOnInit(): void {
        console.log(this.teamsService.teams);
        this.roundService.loadRounds();
    }

    @HostListener('keydown.enter')
    onEnterClick(): void {
        alert('нажата клавиша Enter!');
    }
}
