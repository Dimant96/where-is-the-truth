import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Team} from '../interfaces/team.interface';
import {teamsStorageKey} from './constants/teams-storage-key.const';
import {defaultTeams} from './constants/default-teams.const';
import settings from '../../../../assets/settings.json';

const defaultScoreBumpValue = 100;
const scoreBumpValue = Number.isInteger(settings.scorePoints) && settings.scorePoints > 0
    ? settings.scorePoints
    : defaultScoreBumpValue;
const winnerBumpValue = 1;

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
        this.bumpScore(this.respondingTeamNumberStore$.value);
    }

    bumpWinnerTeam(teamIndex: number) {
        const teams = [...this.teams];
        teams[teamIndex].winner += winnerBumpValue;

        this.teamsStore$.next(teams);
    }

    resetTeams() {
        this.teamsStore$.next(defaultTeams);
    }

    resetScore() {
        const teams = this.teams.map(team => ({
            ...team,
            score: 0,
        }));

        this.teamsStore$.next(teams);
    }

    updateTeamsNames(names: string[]) {
        const teams: Team[] = this.teams.map((team, index) => ({
            ...team,
            name: names[index]
        }));

        this.teamsStore$.next(teams);
    }

    toggleRespondingTeam() {
        const respondingTeam = this.respondingTeamNumberStore$.value;
        const isLastTeam = respondingTeam === this.teams.length - 1;

        if (isLastTeam) {
            this.respondingTeamNumberStore$.next(0);
            return;
        }

        this.respondingTeamNumberStore$.next(respondingTeam + 1);
    }

    toggleRespondingTeamMode() {
        if (this.isTakeTurnsGame) {
            this.respondingTeamNumberStore$.next(null);
            return;
        }

        this.respondingTeamNumberStore$.next(0);
    }
}
