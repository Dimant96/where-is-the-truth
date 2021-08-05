import {Injectable} from '@angular/core';
// @ts-ignore
import rounds from '../../../../../../assets/rounds.json';
import {BehaviorSubject, Observable} from 'rxjs';
import {Round} from './interfaces/round.interface';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class RoundService {
    private selectedRoundNumber$ = new BehaviorSubject(0);

    get round$(): Observable<Round> {
        return this.selectedRoundNumber$.pipe(
            map(selectedRound => rounds[selectedRound] as Round),
        );
    }

    get roundNumber$() {
        return this.selectedRoundNumber$.asObservable();
    }

    constructor() {
    }
}
