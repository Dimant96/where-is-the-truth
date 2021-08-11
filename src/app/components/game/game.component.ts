import {Component, OnInit} from '@angular/core';
import {TeamsService} from './services/teams.service';

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.less']
})
export class GameComponent implements OnInit {
    constructor(private teamsService: TeamsService) {}

    ngOnInit() {
        this.teamsService.init();
    }
}
