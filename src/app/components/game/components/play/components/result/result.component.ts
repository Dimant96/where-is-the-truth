import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {TeamsService} from '../../../../services/teams.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultComponent implements OnInit {
    readonly teams$ = this.teamsService.teams$;

  constructor(private teamsService: TeamsService) { }

  ngOnInit(): void {
  }

}
