import { Question } from './Question';
import * as _ from "lodash";

export interface QuestionRepository {
    get(id: number): Question | undefined;
    getAll(): Question[];
}

export class InMemoryQuestionRepository implements QuestionRepository {
    private questions: Question[];

    private constructor(questions: Question[]) {
        this.questions = questions;
    }

    public static from(questions: Question[]): QuestionRepository {
        return new InMemoryQuestionRepository(questions);
    }

    public get(id: number): Question | undefined {
        let result: Question | undefined = undefined;

        for (const question of this.questions) {
            if (id === question.getId()) {
                result = question;
                break;
            }
        }

        return result;
    }

    public getAll(): Question[] {
        return _.clone(this.questions);
    }
}