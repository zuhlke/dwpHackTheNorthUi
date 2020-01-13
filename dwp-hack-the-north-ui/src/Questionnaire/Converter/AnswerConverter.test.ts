import { answerOne } from '../Answer/AnswerRepo.test';
import { UserAnswer } from '../Answer/Answer';
import { NumericAnswerConverter, AnswerConverter } from './AnswerConverter';

export const userAnswerOne: UserAnswer = {id: 1, questionId: 1, answer: '100'};
export const badAnswerOne: UserAnswer = {id: 1, questionId: 1, answer: 'NonNumerical'};
export const answerConverter: AnswerConverter = NumericAnswerConverter.newInstance();

test('A User Answer can be converted into an Answer', () => {
    expect(answerConverter.convert(userAnswerOne)).toStrictEqual(answerOne);
}, 100);

test('A User Answer with a String as an Answer Value cannot be converted', () => {
    expect(answerConverter.convert(badAnswerOne)).toBeUndefined();
}, 100);