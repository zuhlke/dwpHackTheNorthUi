import { Answer, UserAnswer } from '../Answer/Answer';

export interface Converter<S, T> {
    convert(source: S): T | undefined;
}

export class NumericAnswerConverter implements Converter<UserAnswer, Answer> {
    private constructor() {
        // private to prevent outside instantiation
    };

    public static newInstance(): Converter<UserAnswer, Answer> {
        return new NumericAnswerConverter();
    }

    convert(userAnswer: UserAnswer): Answer | undefined {
        let result: Answer | undefined = undefined;
        const potentialNumber: number = parseInt(userAnswer.answer, 10);

        if (!isNaN(potentialNumber)) {
            result = (userAnswer.id === undefined)
                ? Answer.new(userAnswer.questionId, potentialNumber)
                : Answer.of(userAnswer.id, userAnswer.questionId, potentialNumber);
        }

        return result;
    }   
}