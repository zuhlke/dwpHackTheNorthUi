import { Question } from './Question';

export interface QuestionRepository {
    get(id: number): Question | undefined;
    getAll(): Question[];
    getQuestionCount(): number;
}

export class InMemoryQuestionRepository implements QuestionRepository {
    private questions: Map<number, Question> = new Map<number, Question>();

    private constructor(questions: Question[]) {
        for (const question of questions) {
            this.questions.set(question.getId(), question);
        }
    }

    public static createDefaultInstance(): QuestionRepository {
        return this.from([
            Question.of(1, 'Please state the amount you wish to borrow:'),
            Question.of(2, 'What is the interest rate for the amount you wish to borrow?'),
            Question.of(3, 'How long in months do you wish to take in order to pay back the loan?')
        ]);
    }

    public static from(questions: Question[]): QuestionRepository {
        return new InMemoryQuestionRepository(questions);
    }

    public get(id: number): Question | undefined {
        return this.questions.get(id);
    }

    public getAll(): Question[] {
        return Array.from(this.questions.values());
    }

    public getQuestionCount(): number {
        return this.questions.size;
    }
}