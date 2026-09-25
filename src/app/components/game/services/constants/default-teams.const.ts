import {teamsCounter} from './teams-counter.const';
import {Team} from '../../interfaces/team.interface';

export const defaultTeams: Team[] = Array
    .from({length: teamsCounter})
    .map(() => ({
        name: '',
        score: 0,
        winner: 0,
        roundScores: [],
    }));
