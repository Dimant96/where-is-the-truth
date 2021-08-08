export type Question = CommonQuestion | CommonQuestionWithTimer | Timer;

export interface CommonQuestion {
    text?: string;
    image?: string;
}
export interface CommonQuestionWithTimer extends CommonQuestion {
    timer: number;
}
export interface Timer {
    timer: number;
}
