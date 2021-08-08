import {RoundType} from '../enums/round-type.enum';
import {Question} from './question.interface';

export interface Round {
    type: RoundType;
    questions: Question[];
}
