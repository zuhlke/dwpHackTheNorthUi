import { questionOne, questionTwo, questionRepo, questionOneId, questionTwoId } from './QuestionRepo.test';
import { InMemoryAnswerRepository, AnswerRepository } from './AnswerRepo';
import { Answer } from './Answer';

const answers: Answer[] = [
    Answer.of(1, questionOneId, 'true'),
    Answer.of(2, questionTwoId, 'John'),
    Answer.of(3, questionOneId, 'true')
];
export const answerRepo: AnswerRepository = InMemoryAnswerRepository.of(questionRepo, answers);

test('Question strings can be obtained from an Answer', () => {
    expect(answerRepo.getQuestionFromAnswerId(1)).toBe(questionOne);
}, 100)