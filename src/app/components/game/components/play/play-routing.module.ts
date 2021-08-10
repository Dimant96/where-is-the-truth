import {RouterModule, Routes} from '@angular/router';
import {PlayComponent} from './play.component';
import {NgModule} from '@angular/core';
import {QuestionComponent} from './components/question/question.component';
import {QuestionModule} from './components/question/question.module';
import {PreviewComponent} from './components/preview/preview.component';
import {ResultComponent} from './components/result/result.component';
import {PreviewModule} from './components/preview/preview.module';
import {ResultModule} from './components/result/result.module';

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
    imports: [QuestionModule, PreviewModule, ResultModule, RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PlayRoutingModule {
}
