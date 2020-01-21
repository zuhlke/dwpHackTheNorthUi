export const UNDEFINED_ANSWER = -1;

export interface UserAnswer {
    id?: number;
    questionId: number;
    answer: string;
}

export class Answer {
    private readonly id: number;
    private readonly questionId: number;
    private readonly answer: number;

    private constructor(id: number, questionId: number, answer: number) {
        this.id = id;
        this.questionId = questionId;
        this.answer = answer;
    }

    public static of(id: number, questionId: number, answer: number): Answer {
        return new Answer(id, questionId, answer);
    }

    public static new(questionId: number, answer: number): Answer {
        return new Answer(UNDEFINED_ANSWER, questionId, answer);
    }

    public getId(): number {
        return this.id;
    }

    public getQuestionId(): number {
        return this.questionId;
    }

    public getValue(): number {
        return this.answer;
    }
}