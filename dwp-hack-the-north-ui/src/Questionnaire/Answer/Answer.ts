export const UNDEFINED_ANSWER = -1;

export class Answer {
    private readonly id: number;
    private readonly questionId: number;
    private readonly answer: string;

    private constructor(id: number, questionId: number, answer: string) {
        this.id = id;
        this.questionId = questionId;
        this.answer = answer;
    }

    public static of(id: number, questionId: number, answer: string): Answer {
        return new Answer(id, questionId, answer);
    }

    public static new(questionId: number, answer: string): Answer {
        return new Answer(UNDEFINED_ANSWER, questionId, answer);
    }

    public getId(): number {
        return this.id;
    }

    public hasId(): boolean {
        return this.id !== -1;
    }

    public getQuestionId(): number {
        return this.questionId;
    }

    public getValue(): string {
        return this.answer;
    }
}