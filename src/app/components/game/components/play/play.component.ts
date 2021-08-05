import {Component, HostListener, OnInit} from '@angular/core';
import {RoundService} from './services/round.service';
import {TeamsService} from '../../services/teams.service';
import {RoundType} from './enums/round-type.enum';

@Component({
    selector: 'app-play',
    templateUrl: './play.component.html',
    styleUrls: ['./play.component.less']
})
export class PlayComponent implements OnInit {
    readonly questionRound = RoundType.Question;
    readonly questionWithTimerRound = RoundType.QuestionWithTimer;
    readonly timerRound = RoundType.Timer;

    teams$ = this.teamsService.teams$;
    round$ = this.roundService.round$;
    roundNumber$ = this.roundService.roundNumber$;

    constructor(private roundService: RoundService, private teamsService: TeamsService) {
    }

    ngOnInit(): void {
    }

    @HostListener('keydown.enter')
    onEnterClick(): void {
        alert('нажата клавиша Enter!');
    }
}
