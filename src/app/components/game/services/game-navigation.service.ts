import {Injectable} from '@angular/core';
import {Router, UrlTree} from '@angular/router';
import {GameStep} from '../interfaces/game-step.interface';

@Injectable()
export class GameNavigationService {
    constructor(private router: Router) {}

    goTo(step: GameStep) {
        this.router.navigate(this.stepCommands(step));
    }

    urlTreeFor(step: GameStep): UrlTree {
        return this.router.createUrlTree(this.stepCommands(step));
    }

    goToQuestion(round: number, question: number) {
        this.router.navigate(['play', round, question]);
    }

    private stepCommands(step: GameStep): (string | number)[] {
        switch (step.kind) {
            case 'welcome':
                return ['welcome'];
            case 'teams':
                return ['start'];
            case 'end':
                return ['end'];
            case 'round':
                return ['play', step.round, 0];
            default:
                return ['play', step.round, step.kind];
        }
    }
}
