import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GameComponent} from './game.component';
import {GameRoutingModule} from './game-routing.module';
import { WelcomeComponent } from './components/welcome/welcome.component';
import {StartComponent} from './components/start/start.component';


@NgModule({
    declarations: [GameComponent, WelcomeComponent, StartComponent],
    imports: [
        CommonModule,
        GameRoutingModule
    ],
})
export class GameModule {
}
