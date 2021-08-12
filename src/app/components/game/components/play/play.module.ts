import {NgModule} from '@angular/core';
import {PlayComponent} from './play.component';
import {PlayRoutingModule} from './play-routing.module';
import {RoundService} from './services/round.service';

@NgModule({
    declarations: [PlayComponent],
    imports: [
        PlayRoutingModule,
    ],
    providers: [RoundService],
})
export class PlayModule {
}
