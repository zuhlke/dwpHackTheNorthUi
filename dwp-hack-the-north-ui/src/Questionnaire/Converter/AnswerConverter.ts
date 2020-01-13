import { Answer, UserAnswer } from '../Answer/Answer';

export interface AnswerConverter {
    convert(userAnswer: UserAnswer): Answer | undefined;
}

export class NumericAnswerConverter implements AnswerConverter {
    private constructor() {
        // private to prevent outside instantiation
    };

    public static newInstance(): AnswerConverter {
        return new NumericAnswerConverter();
    }

    convert(userAnswer: UserAnswer): Answer | undefined {
        let result: Answer | undefined = undefined;
        const potentialNumber: number = parseInt(userAnswer.answer, 10);

        if (!isNaN(potentialNumber)) {
            result = Answer.of(userAnswer.id, userAnswer.questionId, potentialNumber);
        }

        return result;
    }   
}