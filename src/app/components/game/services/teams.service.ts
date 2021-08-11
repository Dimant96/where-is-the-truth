import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Team} from '../interfaces/team.interface';
import {teamsStorageKey} from './constants/teams-storage-key.const';
import {defaultTeams} from './constants/default-teams.const';

const scoreBumpValue = 100;

@Injectable()
export class TeamsService {
    private teamsStore$ = new BehaviorSubject<Team[]>(null);
    private respondingTeamNumberStore$ = new BehaviorSubject<number | null>(null);

    get teams(): Team[] {
        return this.teamsStore$.value;
    }

    get teams$(): Observable<Team[]> {
        return this.teamsStore$.asObservable();
    }

    get respondingTeamNumber$(): Observable<number> {
        return this.respondingTeamNumberStore$.asObservable();
    }

    get isTakeTurnsGame(): boolean {
        return this.respondingTeamNumberStore$.value !== null;
    }

    init() {
        const storageTeamsString = localStorage.getItem(teamsStorageKey);
        const storageTeams = storageTeamsString ? JSON.parse(storageTeamsString) : defaultTeams;

        this.teamsStore$.next(storageTeams);
        this.teamsStore$.subscribe(teams => {
            localStorage.setItem(teamsStorageKey, JSON.stringify(teams));
        });
    }

    isRespondingTeam(teamNumber: number) {
        return this.respondingTeamNumberStore$.value !== teamNumber;
    }

    bumpScore(teamIndex: number) {
        const teams = [...this.teams];
        teams[teamIndex].score += scoreBumpValue;

        this.teamsStore$.next(teams);
    }

    bumpScoreReasonsTeam() {
        const teams = [...this.teams];
        const respondingTeamNumber = this.respondingTeamNumberStore$.value;
        teams[respondingTeamNumber].score += scoreBumpValue;

        this.teamsStore$.next(teams);
    }

    resetTeams() {
        this.teamsStore$.next(defaultTeams);
    }

    updateTeamsNames(names: string[]) {
        const teams: Team[] = this.teams.map((team, index) => ({
            ...team,
            name: names[index]
        }));

        this.teamsStore$.next(teams);
    }

    nextRespondingTeam() {
        const respondingTeam = this.respondingTeamNumberStore$.value;

        if (this.respondingTeamNumberStore$.value === this.teams.length - 1) {
            this.respondingTeamNumberStore$.next(0);
            return;
        }

        this.respondingTeamNumberStore$.next(respondingTeam + 1);
    }

    changeRespondingTeamMode() {
        if (this.isTakeTurnsGame) {
            this.respondingTeamNumberStore$.next(null);
            return;
        }

        this.respondingTeamNumberStore$.next(0);
    }
}
