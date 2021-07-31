import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.less']
})
export class GameComponent implements OnInit {

    constructor(
        private router: Router,
        private location: Location,
    ) {
    }

    ngOnInit() {
        console.log(this.location.path());
        this.router.events
            .pipe(
                filter<NavigationEnd>(event => event instanceof NavigationEnd),
            )
            .subscribe(event => {
                console.log(event.url);
            });
    }

}
