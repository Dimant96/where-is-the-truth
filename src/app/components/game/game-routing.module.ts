import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {WelcomeComponent} from './components/welcome/welcome.component';
import {StartComponent} from './components/start/start.component';
import {GameComponent} from './game.component';

const routes: Routes = [
    {
        path: '',
        component: GameComponent,
        children: [
            {
                path: 'welcome',
                component: WelcomeComponent,
            },
            {
                path: 'start',
                component: StartComponent,
            },
            {
                path: 'play',
                loadChildren: () => import('./components/play/play.module').then(m => m.PlayModule),
            },
            {
                path: '',
                redirectTo: 'welcome',
            },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GameRoutingModule {
}
