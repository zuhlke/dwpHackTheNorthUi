import { Question } from './Question';
import { QuestionRepository, InMemoryQuestionRepository } from './QuestionRepo';

test('All questions can be obtained', () => {
    const questionOne: Question = Question.of(1, 'Is this a good test?');
    const questionTwo: Question = Question.of(2, 'What is your name?');

    const expectedQuestions: Question[] = [questionOne, questionTwo];
    const questionRepo: QuestionRepository = InMemoryQuestionRepository.from(expectedQuestions);

    const questionList: Question[] = questionRepo.getAll();
    expect(questionList).toStrictEqual(expectedQuestions);
}, 100)