import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { InMemoryQuestionRepository, QuestionRepository } from './Question/QuestionRepo';
import { Question } from './Question/Question';
import Button from '../common/Button/Button';

interface QuestionId {
    questionId: string;
}

const questionRepo: QuestionRepository = InMemoryQuestionRepository.createDefaultInstance();
const totalQuestionCount: number = questionRepo.getQuestionCount();

export interface QuestionnaireProps extends RouteComponentProps<QuestionId> {
    questionId: string;
}

export function getQuestionFromArray(questionId: string): Question | undefined {
    let result: Question | undefined = undefined;
    const potentialNumber: number = parseInt(questionId);

    if (!isNaN(potentialNumber)) {
        result = questionRepo.get(potentialNumber);
    }

    return result;
};

const next = (props: QuestionnaireProps, question: Question): void => props.history.push('/Questionnaire/' + (question.getId() + 1));

export const Questionnaire: React.FC<QuestionnaireProps> = (props: QuestionnaireProps) => {
    const question: Question | undefined = getQuestionFromArray(props.match.params.questionId);

    if (question === undefined){
        return (
            <div>
                I do not know what this question is!
            </div>
        );
    } else {
        const onClickNext = (): void => next(props, question);
        return (
            <div>
                Questionnaire:
                Question String: {question.getQuestionString()}
                <br/>
                <Button text="Next Question" onClick={onClickNext}></Button>
            </div>
        )
    }
};

export default withRouter(Questionnaire);
