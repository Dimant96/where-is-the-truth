import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class GameNavigationService {
    constructor(private router: Router) {}

    goToStart() {
        this.router.navigate(['start']);
    }

    goToEnd() {
        this.router.navigate(['end']);
    }

    goToQuestion(round: number, question: number) {
        this.router.navigate(['play', round, question]);
    }

    goToResult(round: number) {
        this.router.navigate(['play', round, 'result']);
    }

    goToPreview(round: number) {
        this.router.navigate(['play', round, 'preview']);
    }

    goToWelcome() {
        this.router.navigate(['welcome']);
    }
}
