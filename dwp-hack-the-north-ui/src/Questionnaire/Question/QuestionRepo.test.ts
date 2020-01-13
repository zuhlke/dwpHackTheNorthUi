import { Question } from './Question';
import { QuestionRepository, InMemoryQuestionRepository } from './QuestionRepo';

export const questionOneId = 1;
export const questionTwoId = 2;

export const questionOne: Question = Question.of(questionOneId, 'Is this a good test?');
export const questionTwo: Question = Question.of(questionTwoId, 'What is your name?');

const expectedQuestions: Question[] = [questionOne, questionTwo];
export const questionRepo: QuestionRepository = InMemoryQuestionRepository.from(expectedQuestions);

test('All questions can be obtained', () => {
    expect(questionRepo.getAll()).toStrictEqual(expectedQuestions);
}, 100);

test('A particular question can be obtained', () => {
    expect(questionRepo.get(questionOneId)).toBe(questionOne);
}, 100);

test('An unknown Question ID returns an undefined object', () => {
    expect(questionRepo.get(3)).toBeUndefined();
}, 100);

test('There is a default implementation for use within version 1 of the Project', () => {
    expect(InMemoryQuestionRepository.createDefaultInstance()).toBeTruthy();
}, 100);
