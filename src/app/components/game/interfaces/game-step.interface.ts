export type GameStep =
    | {kind: 'welcome'}
    | {kind: 'teams'}
    | {kind: 'end'}
    | {kind: 'preview' | 'round' | 'result' | 'total', round: number};
