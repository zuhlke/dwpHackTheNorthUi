import { questionOne, questionTwo, questionRepo, questionOneId, questionTwoId } from './QuestionRepo.test';
import { InMemoryAnswerRepository, AnswerRepository } from './AnswerRepo';
import { Answer } from './Answer';

export const answerOne: Answer = Answer.of(1, questionOneId, 'true');
export const answerTwo: Answer = Answer.of(2, questionTwoId, 'John');
export const answerThree: Answer = Answer.of(3, questionOneId, 'true');

const answers: Answer[] = [
    answerOne,
    answerTwo,
    answerThree,
];

export const answerRepo: AnswerRepository = InMemoryAnswerRepository.of(questionRepo, answers);

test('Question strings can be obtained from an Answer', () => {
    expect(answerRepo.getQuestionFromAnswerId(1)).toBe(questionOne);
}, 100);

test('A stored Answer can be obtained', () => {
    expect(answerRepo.get(1)).toBe(answerOne);
}, 100);

test('An unknown ID returns an undefined Answer', () => {
    expect(answerRepo.get(9999)).toBeUndefined();
}, 100);

test('An answer can be saved into the Repository', () => {
    const createdAnswer: Answer = Answer.of(4, 1, 'true');
    const createdAnswerId = answerRepo.add(createdAnswer);

    expect(answerRepo.get(createdAnswerId)).toBe(createdAnswer);
}, 100);