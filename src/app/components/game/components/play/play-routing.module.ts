import {RouterModule, Routes} from '@angular/router';
import {PlayComponent} from './play.component';
import {NgModule} from '@angular/core';
import {PreviewComponent} from './components/preview/preview.component';
import {ResultComponent} from './components/result/result.component';
import {PreviewModule} from './components/preview/preview.module';
import {ResultModule} from './components/result/result.module';
import {TotalComponent} from './components/total/total.component';
import {TotalModule} from './components/total/total.module';
import {RoundModule} from './components/round/round.module';
import {RoundComponent} from './components/round/round.component';

const routes: Routes = [
    {
        path: ':round',
        component: PlayComponent,
        children: [
            {
                path: 'preview',
                component: PreviewComponent,
            },
            {
                path: 'result',
                component: ResultComponent,
            },
            {
                path: 'total',
                component: TotalComponent,
            },
            {
                path: ':question',
                component: RoundComponent,
            },
            {
                path: '**',
                redirectTo: 'preview',
            }
        ]
    },
    {
        path: '**',
        redirectTo: '0',
    },
];

@NgModule({
    imports: [RoundModule, PreviewModule, ResultModule, TotalModule, RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PlayRoutingModule {
}
