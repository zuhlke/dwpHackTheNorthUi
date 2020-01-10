import { Question } from './Question';

export interface QuestionRepository {
    get(id: number): Question | undefined;
    getAll(): Question[];
}

export class InMemoryQuestionRepository implements QuestionRepository {
    private questions: Map<number, Question> = new Map<number, Question>();

    private constructor(questions: Question[]) {
        for (const question of questions) {
            this.questions.set(question.getId(), question);
        }
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
}