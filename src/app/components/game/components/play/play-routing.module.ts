import {RouterModule, Routes} from '@angular/router';
import {PlayComponent} from './play.component';
import {NgModule} from '@angular/core';
import {QuestionComponent} from './components/question/question.component';
import {PreviewComponent} from './components/preview/preview.component';
import {ResultComponent} from './components/result/result.component';

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
                path: ':question',
                component: QuestionComponent,
            },
            {
                path: '**',
                redirectTo: '0',
            }
        ]
    },
    {
        path: '**',
        redirectTo: '0',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PlayRoutingModule {
}
