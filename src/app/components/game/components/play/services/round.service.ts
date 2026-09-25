import rounds from '../../../../../../assets/rounds.json';
import {Injectable} from '@angular/core';
import {Round} from '../interfaces/round.interface';

@Injectable()
export class RoundService {
    getRound(round: number): Round {
        return rounds[round] as Round;
    }

    isRoundHasQuestion(round: number) {
        return this.getRound(round).questions;
    }

    isAllQuestionsResolve(round: number, question: number) {
        const lastQuestionNumber = this.getRound(round).questions.length - 1;

        return question > lastQuestionNumber;
    }
}
