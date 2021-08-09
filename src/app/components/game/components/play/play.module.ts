import {NgModule} from '@angular/core';
import {PlayComponent} from './play.component';
import {PlayRoutingModule} from './play-routing.module';

@NgModule({
    declarations: [PlayComponent],
    imports: [
        PlayRoutingModule,
    ]
})
export class PlayModule {
}
