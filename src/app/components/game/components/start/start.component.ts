import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {FormArray, FormBuilder, Validators} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';
import {TeamsService} from '../../services/teams.service';
import {TeamsOrder} from '../../enums/teams-order.enum';

@Component({
    selector: 'app-start',
    templateUrl: './start.component.html',
    styleUrls: ['./start.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StartComponent implements OnInit {
    readonly firsTeams = TeamsOrder.First;
    readonly secondTeams = TeamsOrder.Second;

    teamsNamesForm: FormArray;

    constructor(
        private formBuilder: FormBuilder,
        private teamsService: TeamsService
    ) {}

    ngOnInit(): void {
        this.initForm();
        this.listenChangeForm();
    }

    private initForm() {
        const teamsNamesForm = this.teamsService
            .teams
            .map(({name}) => [name, Validators.required]);

        this.teamsNamesForm = this.formBuilder.array(teamsNamesForm);
    }

    private listenChangeForm() {
        this.teamsNamesForm
            .valueChanges
            .pipe(
                debounceTime(400),
            )
            .subscribe(teamsNames => {
                this.teamsService.updateTeamsNames(teamsNames);
            });
    }
}
