import {Team} from '../../../interfaces/team.interface';

export function getWinnerTeam(teams: Team[]): Team {
    return teams.sort((first, second) => first.winner - second.winner)[0];
}
