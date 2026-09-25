import rounds from '../../../../../../assets/rounds.json';
import {Injectable} from '@angular/core';
import {Round} from '../interfaces/round.interface';
import {Question} from '../interfaces/question.interface';
import {isTeamRoundType} from '../enums/round-type.enum';

@Injectable()
export class RoundService {
    getRound(round: number): Round {
        return rounds[round] as Round;
    }

    isTeamRound(round: number): boolean {
        return isTeamRoundType(this.getRound(round).type);
    }

    // The questions in play: a team round's list for the given team (none while no team is picked),
    // the round's own list otherwise; undefined for a round without questions, like a plain timer.
    questionsOf(round: number, team: number | null): Question[] | undefined {
        const roundData = this.getRound(round);

        if (!isTeamRoundType(roundData.type)) {
            return roundData.questions;
        }

        return team === null ? undefined : (roundData.teamQuestions || [])[team] || [];
    }

    isRoundHasQuestion(round: number, team: number | null = null): boolean {
        return !!this.questionsOf(round, team);
    }

    isAllQuestionsResolve(round: number, question: number, team: number | null = null): boolean {
        const questions = this.questionsOf(round, team) || [];

        return question > questions.length - 1;
    }
}
