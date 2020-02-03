export class Question {
    private readonly id: number;
    private readonly questionString: string;

    private constructor(id: number, questionString: string) {
        this.id = id;
        this.questionString = questionString;
    }

    public static of(id: number, questionString: string): Question {
        return new Question(id, questionString);
    }

    public static ofJson(json: any): Question {
        return new Question(json.Id, json.Text);
    }

    public getId(): number {
        return this.id;
    }

    public getQuestionString(): string {
        return this.questionString;
    }

}
