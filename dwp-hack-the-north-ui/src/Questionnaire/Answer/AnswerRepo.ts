import * as _ from 'lodash';
import {Answer, UNDEFINED_ANSWER} from './Answer';
import {Question} from '../Question/Question';
import {QuestionRepository} from '../Question/QuestionRepo';

export interface AnswerRepository {
    add(answer: Answer): number | undefined;
    getAll(): Answer[];
    get(answerId: number): Answer | undefined;
    getQuestionFromAnswerId(answerId: number): Question | undefined;
}

export class InMemoryAnswerRepository implements AnswerRepository {

    private answers: Map<number, Answer> = new Map<number, Answer>();
    private questionRepo: QuestionRepository;

    private constructor(questionRepo: QuestionRepository, answerArray: Answer[]) {
        this.questionRepo = questionRepo;
        for (const answer of answerArray) {
            this.answers.set(answer.getId(), answer);
        }

        this.answers.set(-1, Answer.of(-1, -1, 0));
    }

    public static of(questionRepo: QuestionRepository, answerArray: Answer[]): AnswerRepository {
        return new InMemoryAnswerRepository(questionRepo, answerArray);
    }

    add(answer: Answer): number | undefined {
        let result: number | undefined = undefined;

        if (this.answers.get(answer.getId()) === undefined) {
            this.answers.set(answer.getId(), answer);
            result = answer.getId();
        } else if (answer.getId() === UNDEFINED_ANSWER) {
            result = this.getNextKey();
            this.answers.set(result, Answer.of(result, answer.getQuestionId(), answer.getValue()));
        }

        return result;
    }

    getAll(): Answer[] {
        return Array.from(this.answers.values());
    }

    get(answerId: number): Answer | undefined {
        return this.answers.get(answerId);
    }

    getQuestionFromAnswerId(answerId: number): Question | undefined {
        let result: Question | undefined = undefined;
        const answer: Answer | undefined = this.answers.get(answerId);

        if (answer !== undefined) {
            result = this.questionRepo.get(answer.getQuestionId());
        }

        return result;
    }

    private getNextKey(): number {
        let result = 0;
        const highestKey: number | undefined = _.maxBy(Array.from(this.answers.keys()), (object) => object);

        if (highestKey !== undefined) {
            result = highestKey + 1;
        }

        return result;
    }
}