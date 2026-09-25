import {RoundType} from '../enums/round-type.enum';
import {Question} from './question.interface';

export interface Round {
    type: RoundType;
    name: string;
    timer: number;
    questions?: Question[];
    // Team rounds only: [first team's questions, second team's questions].
    teamQuestions?: Question[][];
}
