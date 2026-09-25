import {Injectable} from '@angular/core';
import {CanActivate, UrlTree} from '@angular/router';
import {GameFlowService} from './game-flow.service';

@Injectable()
export class FirstStepGuard implements CanActivate {
    constructor(private gameFlowService: GameFlowService) {}

    canActivate(): UrlTree {
        return this.gameFlowService.firstStepUrl;
    }
}
