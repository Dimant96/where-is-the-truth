import {Component, OnInit, ChangeDetectionStrategy, HostListener} from '@angular/core';
import {FormArray, FormBuilder, Validators} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';
import {TeamsService} from '../../services/teams.service';
import {TeamsOrder} from '../../enums/teams-order.enum';
import {GameFlowService} from '../../services/game-flow.service';
import {GameStep} from '../../interfaces/game-step.interface';
import {gameFlow} from '../../services/constants/game-flow.const';

const step: GameStep = {kind: 'teams'};

@Component({
    selector: 'app-start',
    templateUrl: './start.component.html',
    styleUrls: ['./start.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StartComponent implements OnInit {
    readonly firsTeams = TeamsOrder.First;
    readonly secondTeams = TeamsOrder.Second;
    readonly isPresetNames = gameFlow.teamsMode === 'preset';
    readonly teams$ = this.teamsService.teams$;

    teamsNamesForm: FormArray;

    @HostListener('document:keydown.ArrowRight')
    keydownArrowRight() {
        this.gameFlowService.next(step);
    }

    @HostListener('document:keydown.ArrowLeft')
    keydownArrowLeft() {
        this.gameFlowService.prev(step);
    }

    constructor(
        private formBuilder: FormBuilder,
        private teamsService: TeamsService,
        private gameFlowService: GameFlowService,
    ) {}

    ngOnInit(): void {
        this.gameFlowService.enter(step);
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
