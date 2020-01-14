import { answerOne } from '../Answer/AnswerRepo.test';
import { UserAnswer, Answer } from '../Answer/Answer';
import { NumericAnswerConverter, Converter } from './Converter';

export const userAnswerOne: UserAnswer = {id: 1, questionId: 1, answer: '100'};
export const userAnswerTwo: UserAnswer = {questionId: 2, answer: '200'};
export const badAnswerOne: UserAnswer = {id: 1, questionId: 1, answer: 'NonNumerical'};
export const answerConverter: Converter<UserAnswer, Answer> = NumericAnswerConverter.newInstance();

test('A User Answer can be converted into an Answer', async () => {
    expect(answerConverter.convert(userAnswerOne)).toStrictEqual(answerOne);
}, 100);

test('A User Answer with a String as an Answer Value cannot be converted', async () => {
    expect(answerConverter.convert(badAnswerOne)).toBeUndefined();
}, 100);

test('A User Answer without an Answer ID has the negative Answer ID', async () => {
    expect(answerConverter.convert(userAnswerTwo)).toStrictEqual(Answer.of(-1, 2, 200));
}, 100);