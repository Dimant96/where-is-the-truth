import {Component, OnInit, ChangeDetectionStrategy, HostListener} from '@angular/core';
import {TeamsService} from '../../services/teams.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WelcomeComponent implements OnInit {
    @HostListener('document:keydown.ArrowRight')
    keydownArrowRight() {
        this.router.navigate(['start']);
    }

    constructor(private teamsService: TeamsService, private router: Router) {}

    ngOnInit() {
        this.teamsService.resetTeams();
    }
}
