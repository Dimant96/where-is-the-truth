import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RoundService} from '../../services/round.service';
import {map} from 'rxjs/operators';

@Component({
    selector: 'app-preview',
    templateUrl: './preview.component.html',
    styleUrls: ['./preview.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewComponent implements OnInit {
    readonly roundNumber$ = this.activatedRoute.parent.params.pipe(map(({round}) => round));
    readonly round$ = this.activatedRoute.parent.params.pipe(map(this.roundService.getRound));

    constructor(private activatedRoute: ActivatedRoute, private roundService: RoundService) {
    }

    ngOnInit(): void {
    }

}
