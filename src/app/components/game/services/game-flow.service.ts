import {Injectable} from '@angular/core';
import {UrlTree} from '@angular/router';
import rounds from '../../../../assets/rounds.json';
import {GameStep} from '../interfaces/game-step.interface';
import {GameNavigationService} from './game-navigation.service';
import {TeamsService} from './teams.service';
import {GameFlow, gameFlow} from './constants/game-flow.const';

function buildSteps(flow: GameFlow, roundsCount: number): GameStep[] {
    const steps: GameStep[] = [];

    flow.blocks
        .filter(block => block.enabled)
        .forEach(block => {
            if (block.id !== 'stages') {
                steps.push({kind: block.id});
                return;
            }

            for (let round = 0; round < roundsCount; round++) {
                if (flow.stagePreview) {
                    steps.push({kind: 'preview', round});
                }

                steps.push({kind: 'round', round});

                if (flow.afterStage === 'winner') {
                    steps.push({kind: 'result', round});
                } else if (flow.afterStage === 'total') {
                    steps.push({kind: 'total', round});
                }
            }
        });

    return steps;
}

function isSameStep(a: GameStep, b: GameStep): boolean {
    return a.kind === b.kind && (a as {round?: number}).round === (b as {round?: number}).round;
}

@Injectable()
export class GameFlowService {
    private readonly steps = buildSteps(gameFlow, rounds.length);

    constructor(
        private gameNavigationService: GameNavigationService,
        private teamsService: TeamsService,
    ) {}

    get firstStepUrl(): UrlTree {
        return this.gameNavigationService.urlTreeFor(this.steps[0] || {kind: 'end'});
    }

    // Whatever slide opens the game starts it from scratch, as the welcome slide always did.
    enter(step: GameStep) {
        if (this.steps.length && isSameStep(this.steps[0], step)) {
            this.teamsService.resetTeams();
        }
    }

    next(step: GameStep) {
        const index = this.indexOf(step);

        if (index === -1) {
            this.gameNavigationService.goTo(this.steps[0]);
            return;
        }

        if (index < this.steps.length - 1) {
            this.gameNavigationService.goTo(this.steps[index + 1]);
        }
    }

    // Going back never re-enters a stage that has its own preview: the preview leads into it again.
    prev(step: GameStep) {
        const index = this.indexOf(step);

        for (let i = index - 1; i >= 0; i--) {
            const candidate = this.steps[i];
            const hasPreview = candidate.kind === 'round'
                && this.steps.some(other => other.kind === 'preview' && other.round === candidate.round);

            if (!hasPreview) {
                this.gameNavigationService.goTo(candidate);
                return;
            }
        }
    }

    private indexOf(step: GameStep): number {
        return this.steps.findIndex(known => isSameStep(known, step));
    }
}
