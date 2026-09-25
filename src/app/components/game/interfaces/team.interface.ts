export interface Team {
    name: string;
    score: number;
    winner: number;
    // Points earned in each stage, by stage number; the "total" slide sums them.
    roundScores: number[];
}
