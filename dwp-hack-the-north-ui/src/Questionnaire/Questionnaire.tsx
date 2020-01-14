import React, { ReactElement } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { BreadcrumbCurrentProps, BreadcrumbListItemProps, BreadcrumbListProps } from '../common/Breadcrumb/Breadcrumb';
import Button from '../common/Button/Button';
import { Question } from './Question/Question';
import { InMemoryQuestionRepository, QuestionRepository } from './Question/QuestionRepo';
import { MainContent } from '../common/Content/MainContent';

interface QuestionId {
    questionId: string;
}

const questionRepo: QuestionRepository = InMemoryQuestionRepository.createDefaultInstance();
const totalQuestionCount: number = questionRepo.getQuestionCount();
const next = (props: QuestionnaireProps, question: Question): void => props.history.push('/Questionnaire/' + (question.getId() + 1));

export interface QuestionnaireProps extends RouteComponentProps<QuestionId> {
    questionId: string;
}

function getQuestionFromArray(questionId: string): Question | undefined {
    let result: Question | undefined = undefined;
    const potentialNumber: number = parseInt(questionId);

    if (!isNaN(potentialNumber)) {
        result = questionRepo.get(potentialNumber);
    }

    return result;
};

function generateSuccessfulQuestion(props: QuestionnaireProps, question: Question): ReactElement {
    const onClickNext = (): void => next(props, question);

    return (
        <div>
            <h1 className="govuk-heading-x1">{question.getQuestionString()}</h1>
            <br />
            <Button text="Next Question" onClick={onClickNext} />
        </div>
    );
}

function undefinedQuestionElement(): ReactElement {
    return (
        <div>
            <h1 className="govuk-heading-x1">I do not know what this question is!</h1>
        </div>);
}

function getPageBreadcrumbProps(question: Question | undefined): BreadcrumbListProps {
    const currentQuestion: string = (question === undefined) ? "Unknown Question" : "Question " + question.getId();
    const navCurrentProps: BreadcrumbCurrentProps = { visibleText: currentQuestion };
    const navParentProps: BreadcrumbListItemProps[] = [
        { href: "/", visibleText: "Home: Loan Calculator" },
        { href: "/Questionnaire", visibleText: "Questionnaire" },
    ];    

    return {parentItems: navParentProps, currentItem: navCurrentProps};
}

function getReactiveContent(props: QuestionnaireProps, question: Question | undefined): ReactElement {
    return (question === undefined) ? undefinedQuestionElement() : generateSuccessfulQuestion(props, question);
}

export const Questionnaire: React.FC<QuestionnaireProps> = (props: QuestionnaireProps) => {
    const question: Question | undefined = getQuestionFromArray(props.match.params.questionId);
    const reactiveContent: ReactElement = getReactiveContent(props, question);

    return (
        <MainContent breadcrumbData={getPageBreadcrumbProps(question)} reactiveContent={reactiveContent} />
    );
};

export default withRouter(Questionnaire);
