import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Team} from '../interfaces/team.interface';
import {teamsStorageKey} from './constants/teams-storage-key.const';
import {defaultTeams} from './constants/default-teams.const';
import {startTeamNames} from './constants/game-flow.const';
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

    // The team that is lit while the other is dimmed; null while both are lit.
    get respondingTeam(): number | null {
        return this.respondingTeamNumberStore$.value;
    }

    init() {
        const storageTeamsString = localStorage.getItem(teamsStorageKey);
        const storageTeams: Team[] = storageTeamsString ? JSON.parse(storageTeamsString) : defaultTeams;
        const teams = storageTeams.map(team => ({
            ...team,
            roundScores: Array.isArray(team.roundScores) ? team.roundScores : [],
        }));

        this.teamsStore$.next(teams);
        this.teamsStore$.subscribe(teams => {
            localStorage.setItem(teamsStorageKey, JSON.stringify(teams));
        });
    }

    isRespondingTeam(teamNumber: number) {
        return this.respondingTeamNumberStore$.value !== teamNumber;
    }

    bumpScore(teamIndex: number) {
        const teams = this.teams.map((team, index) => index === teamIndex
            ? {...team, score: team.score + scoreBumpValue}
            : team);

        this.teamsStore$.next(teams);
    }

    bumpScoreReasonsTeam() {
        this.bumpScore(this.respondingTeamNumberStore$.value);
    }

    bumpWinnerTeam(teamIndex: number) {
        const teams = this.teams.map((team, index) => index === teamIndex
            ? {...team, winner: team.winner + winnerBumpValue}
            : team);

        this.teamsStore$.next(teams);
    }

    resetTeams() {
        this.teamsStore$.next(defaultTeams.map((team, index) => ({
            ...team,
            name: startTeamNames[index],
            roundScores: [],
        })));
    }

    // Entering a stage shows what the teams already earned in it, so leaving and coming back doesn't lose points.
    startRoundScore(round: number) {
        const teams = this.teams.map(team => ({
            ...team,
            score: team.roundScores[round] || 0,
        }));

        this.teamsStore$.next(teams);
    }

    commitRoundScore(round: number) {
        const teams = this.teams.map(team => {
            const roundScores = [...team.roundScores];
            roundScores[round] = team.score;

            return {...team, score: 0, roundScores};
        });

        this.teamsStore$.next(teams);
    }

    totalScore(team: Team, lastRound: number): number {
        return team.roundScores
            .slice(0, lastRound + 1)
            .reduce((sum, score) => sum + (score || 0), 0);
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
