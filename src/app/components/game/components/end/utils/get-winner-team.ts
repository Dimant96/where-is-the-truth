import {Team} from '../../../interfaces/team.interface';

export function getWinnerTeam(teams: Team[]): Team {
    return teams.sort((first, second) => second.winner - first.winner)[0];
}
