import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GameComponent} from './game.component';
import {GameRoutingModule} from './game-routing.module';
import { WelcomeComponent } from './components/welcome/welcome.component';
import {StartComponent} from './components/start/start.component';
import {ReactiveFormsModule} from '@angular/forms';
import {TeamsService} from './services/teams.service';
import { EndComponent } from './components/end/end.component';


@NgModule({
    declarations: [GameComponent, WelcomeComponent, StartComponent, EndComponent],
    imports: [
        CommonModule,
        GameRoutingModule,
        ReactiveFormsModule
    ],
    providers: [TeamsService],
})
export class GameModule {
}
