import {teamsCounter} from './teams-counter.const';

export const defaultTeams = Array
    .from({length: teamsCounter})
    .map(() => ({
        name: '',
        score: 0,
        winner: 0,
    }));
