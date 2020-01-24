import {Answer} from './Answer';
import {AnswerRepository, InMemoryAnswerRepository} from './AnswerRepo';
import {questionOne, questionOneId, questionRepo, questionTwoId} from '../Question/QuestionRepo.test';

export const answerOneId = 1;
export const answerTwoId = 2;
export const answerThreeId = 3;

export const answerOne: Answer = Answer.of(answerOneId, questionOneId, 100);
export const answerTwo: Answer = Answer.of(answerTwoId, questionTwoId, 200);
export const answerThree: Answer = Answer.of(answerThreeId, questionOneId, 150);

const answers: Answer[] = [
    answerOne,
    answerTwo,
    answerThree,
];

export const answerRepo: AnswerRepository = InMemoryAnswerRepository.of(questionRepo, answers);

test('Question strings can be obtained from an Answer', async () => {
    expect(answerRepo.getQuestionFromAnswerId(1)).toBe(questionOne);
}, 100);

test('A stored Answer can be obtained', async () => {
    expect(answerRepo.get(1)).toBe(answerOne);
}, 100);

test('An unknown ID returns an undefined Answer', async () => {
    expect(answerRepo.get(9999)).toBeUndefined();
}, 100);

test('An answer can be saved into the Repository', () => {
    const createdAnswer: Answer = Answer.of(4, 1, 100);
    const createdAnswerId: number | undefined = answerRepo.add(createdAnswer);

    if (createdAnswerId === undefined) {
        fail('The Created Answer ID should be defined!');
    } else {
        expect(answerRepo.get(createdAnswerId)).toBe(createdAnswer);
    }
}, 100);

test('An answer already within the Repository cannot be added', () => {
    const createdAnswer: Answer = Answer.of(answerOneId, questionOneId, 100);
    const createdAnswerId = answerRepo.add(createdAnswer);

    expect(createdAnswerId).toBeUndefined();
});

test('An answer with an undefined ID can be added, with an ID assigned to it', () => {
    const createdAnswer: Answer = Answer.new(questionOneId, 100);
    const createdAnswerId = answerRepo.add(createdAnswer);

    if (createdAnswerId === undefined) {
        fail('The created Answer ID should not be undefined!');
    } else {
        const returnedAnswer: Answer | undefined = answerRepo.get(createdAnswerId);

        expect(returnedAnswer?.getQuestionId()).toBe(createdAnswer.getQuestionId());
        expect(returnedAnswer?.getValue()).toBe(createdAnswer.getValue());
    }

}, 100);