export enum RoundType {
    Question = 'Question',
    QuestionWithTimer = 'Question with timer',
    Timer = 'Timer',
    // Each team has its own questions; the lit team's list is the one Space plays.
    TeamQuestion = 'Team questions',
    TeamQuestionWithTimer = 'Team questions with timer',
}

export function isTeamRoundType(type: RoundType): boolean {
    return type === RoundType.TeamQuestion || type === RoundType.TeamQuestionWithTimer;
}
