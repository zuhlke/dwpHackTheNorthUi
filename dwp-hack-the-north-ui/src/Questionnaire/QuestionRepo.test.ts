import { Question } from './Question';
import { QuestionRepository, InMemoryQuestionRepository } from './QuestionRepo';

const questionOne: Question = Question.of(1, 'Is this a good test?');
const questionTwo: Question = Question.of(2, 'What is your name?');

const expectedQuestions: Question[] = [questionOne, questionTwo];
const questionRepo: QuestionRepository = InMemoryQuestionRepository.from(expectedQuestions);

test('All questions can be obtained', () => {
    expect(questionRepo.getAll()).toStrictEqual(expectedQuestions);
}, 100)

test('A particular question can be obtained', () => {
    expect(questionRepo.get(1)).toBe(questionOne);
}, 100)

test('There is a default implementation for use within version 1 of the Project', () => {
    expect(InMemoryQuestionRepository.createDefaultInstance()).toBeTruthy();
}, 100)
