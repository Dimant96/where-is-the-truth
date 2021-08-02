import {Injectable} from '@angular/core';
// @ts-ignore
import rounds from '../../../../../../assets/rounds.json';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RoundService {
    private roundsStore$ = new BehaviorSubject(rounds);

    constructor() {
    }

    loadRounds() {
        console.log(rounds);
    }

}
