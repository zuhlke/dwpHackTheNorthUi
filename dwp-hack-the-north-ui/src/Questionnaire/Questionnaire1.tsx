import {default as React, Dispatch, ReactElement, useState} from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { BreadcrumbCurrentProps, BreadcrumbListItemProps, BreadcrumbListProps } from '../common/Breadcrumb/Breadcrumb';
import { Button } from '../common/Button/Button';
import { MainContent } from '../common/Content/MainContent';
import { loanAmount, loanInterest, LoanSegment, loanTime } from '../reducers/QuestionState';
import { Question } from './Question/Question';
import { InMemoryQuestionRepository, QuestionRepository } from './Question/QuestionRepo';
import { History } from "history";

const questionRepo: QuestionRepository = InMemoryQuestionRepository.createDefaultInstance();
const questionCount = questionRepo.getQuestionCount();

function generateLoanSegment(questionId: number, userInput: string): LoanSegment | undefined {
    let result: LoanSegment | undefined = undefined;

    switch (questionId) {
        case 1:
            result = loanAmount(userInput);
            break;
        case 2:
            result = loanInterest(userInput);
            break;
        case 3:
            result = loanTime(userInput);
            break;
        default:
            break;
    }

    return result;
}

const handleTextChange = (userInput: string, question: Question, dispatch: Dispatch<LoanSegment>): void => {
    const loanSegment: LoanSegment | undefined = generateLoanSegment(question.getId(), userInput);
    if (loanSegment !== undefined) {
        dispatch(loanSegment);
    }
};

const handleQuestionResponse = (history: History): void => {
    history.push("/Questionnaire/2");
};

function getQuestionFromArray(questionId: number): Question | undefined {
    const result: Question | undefined = questionRepo.get(questionId);
    return result;
}

function generateSuccessfulQuestion(question: Question, dispatch: Dispatch<LoanSegment>, history: History): ReactElement {
    const onClickNext = (): void => handleQuestionResponse(history);

    return (
        <div>
            <h1 className="govuk-heading-x1">{question.getQuestionString()}</h1>
            <br />
            <form>
                <input className="govuk-input govuk-input--width-10" type="text" onChange={(text): void => handleTextChange(text.target.value, question, dispatch)}/>
                <br /><br /><br />
                <Button text="Continue" onClick={onClickNext} arrow={false}/>
            </form>
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

function getReactiveContent(question: Question | undefined, dispatch: Dispatch<LoanSegment>, history: History): ReactElement {
    return (question === undefined) ? undefinedQuestionElement() : generateSuccessfulQuestion(question, dispatch, history);
}

export const Questionnaire1: React.FC = () => {
    const dispatch: Dispatch<LoanSegment> = useDispatch();
    const history: History = useHistory();
    const questionId = 1;
    const question: Question | undefined = getQuestionFromArray(questionId);
    const reactiveContent: ReactElement = getReactiveContent(question, dispatch, history);

    return (
       <MainContent breadcrumbData={getPageBreadcrumbProps(question)} reactiveContent={reactiveContent} />
    );
};