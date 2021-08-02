import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Team} from '../interfaces/team.interface';
import {teamsStorageKey} from './constants/teams-storage-key.const';
import {defaultTeams} from './constants/default-teams.const';

@Injectable()
export class TeamsService {
    private teamsStore = new BehaviorSubject<Team[]>(null);

    get teams(): Team[] {
        return this.teamsStore.value;
    }

    get teams$(): Observable<Team[]> {
        return this.teamsStore.asObservable();
    }

    init() {
        const storageTeamsString = localStorage.getItem(teamsStorageKey);
        const storageTeams = storageTeamsString ? JSON.parse(storageTeamsString) : defaultTeams;

        this.teamsStore.next(storageTeams);
        this.teamsStore.subscribe(teams => {
            localStorage.setItem(teamsStorageKey, JSON.stringify(teams));
        });
    }

    resetTeams() {
        this.teamsStore.next(defaultTeams);
    }

    updateTeamsNames(names: string[]) {
        const teams: Team[] = this.teams.map((team, index) => ({
            ...team,
            name: names[index]
        }));

        this.teamsStore.next(teams);
    }
}
