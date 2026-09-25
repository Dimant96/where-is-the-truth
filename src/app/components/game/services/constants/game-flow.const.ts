import settings from '../../../../../assets/settings.json';
import {teamsCounter} from './teams-counter.const';

export type FlowBlockId = 'welcome' | 'teams' | 'stages' | 'end';
export type AfterStage = 'winner' | 'total' | 'none';
// 'preset': names are typed in the Constructor beforehand; 'live': the teams slide starts empty.
export type TeamsMode = 'live' | 'preset';

export interface GameFlow {
    blocks: {id: FlowBlockId, enabled: boolean}[];
    stagePreview: boolean;
    afterStage: AfterStage;
    teamsMode: TeamsMode;
}

const blockIds: FlowBlockId[] = ['welcome', 'teams', 'stages', 'end'];
const afterStageValues: AfterStage[] = ['winner', 'total', 'none'];
const rawSettings = settings as {[key: string]: unknown};

// The Constructor edits settings.gameFlow; anything missing or broken falls back to the classic order.
function readGameFlow(raw: any): GameFlow {
    const flow = raw && typeof raw === 'object' ? raw : {};
    const rawBlocks: any[] = Array.isArray(flow.blocks) ? flow.blocks : [];
    const blocks: GameFlow['blocks'] = [];

    rawBlocks.forEach(block => {
        const id = block && block.id;

        if (blockIds.includes(id) && !blocks.some(known => known.id === id)) {
            blocks.push({id, enabled: id === 'stages' || block.enabled !== false});
        }
    });
    blockIds
        .filter(id => !blocks.some(known => known.id === id))
        .forEach(id => blocks.push({id, enabled: true}));

    return {
        blocks,
        stagePreview: flow.stagePreview !== false,
        afterStage: afterStageValues.includes(flow.afterStage) ? flow.afterStage : 'winner',
        teamsMode: flow.teamsMode === 'preset' ? 'preset' : 'live',
    };
}

function readTeamNames(raw: unknown): string[] {
    const names = Array.isArray(raw) ? raw : [];

    return Array.from({length: teamsCounter}, (_, index) => typeof names[index] === 'string' ? names[index].trim() : '');
}

export const gameFlow = readGameFlow(rawSettings.gameFlow);

// Names every new game starts with: the Constructor's ones in the 'preset' mode, empty otherwise.
export const startTeamNames = gameFlow.teamsMode === 'preset'
    ? readTeamNames(rawSettings.teamNames)
    : readTeamNames([]);
