import { Answer } from './Answer';
import { Question } from './Question';
import { QuestionRepository } from './QuestionRepo';

export interface AnswerRepository {
    add(answer: Answer): number;
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
    }

    public static of(questionRepo: QuestionRepository, answerArray: Answer[]): AnswerRepository {
        return new InMemoryAnswerRepository(questionRepo, answerArray);
    }

    add(answer: Answer): number {
        this.answers.set(answer.getId(), answer);
        return answer.getId();
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
}