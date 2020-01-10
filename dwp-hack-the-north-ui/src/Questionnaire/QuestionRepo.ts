import { Question } from './Question';
import * as _ from "lodash";

export interface QuestionRepository {
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

    public getAll(): Question[] {
        return _.clone(this.questions);
    }
}