import { default as React, Dispatch, ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { BreadcrumbCurrentProps, BreadcrumbListItemProps, BreadcrumbListProps } from '../common/Breadcrumb/Breadcrumb';
import { Button } from '../common/Button/Button';
import { MainContent } from '../common/Content/MainContent';
import { loanAmount, loanInterest, LoanSegment, loanTime } from '../reducers/QuestionState';
import { Question } from './Question/Question';
import { InMemoryQuestionRepository, QuestionRepository } from './Question/QuestionRepo';
import { LoanAmount, LoanInterest, LoanTime } from '../Result/Calculator/Loan';

export interface QuestionnaireInputData {
    questionId: string;
}

interface QuestionnaireStateData {
    questionId: string;
    loanAmount?: LoanAmount;
    loanInterest?: LoanInterest;
    loanTime?: LoanTime;
}

interface QuestionnaireData extends RouteComponentProps<QuestionnaireInputData> {
    questionId: string;
}

interface QuestionnaireDispatchData {
    handleTextChange: (questionId: number, question: Question, dispatch: Dispatch<LoanSegment>) => void;
}

export type QuestionnaireProps = QuestionnaireStateData & QuestionnaireDispatchData & QuestionnaireData;

const questionRepo: QuestionRepository = InMemoryQuestionRepository.createDefaultInstance();
const questionCount = questionRepo.getQuestionCount();

function generateLoanSegment(questionId: number, userInput: string): LoanSegment | undefined {
    let result: LoanSegment | undefined = undefined;

    switch (questionId) {
        case 1:
            result =loanAmount(userInput);
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
        console.log(JSON.stringify(loanSegment));
        dispatch(loanSegment);
    }
};

const handleQuestionResponse = (props: QuestionnaireProps, question: Question): void => {
    const nextPage: string = '/Questionnaire/' + ((question.getId() === questionCount) ? 'Result' : (question.getId() + 1).toString());
    props.history.push(nextPage);
};

function getQuestionFromArray(questionId: string): Question | undefined {
    let result: Question | undefined = undefined;
    const potentialNumber: number = parseInt(questionId);

    if (!isNaN(potentialNumber)) {
        result = questionRepo.get(potentialNumber);
    }

    return result;
};

function generateSuccessfulQuestion(props: QuestionnaireProps, question: Question, dispatch: Dispatch<LoanSegment>): ReactElement {
    const onClickNext = (): void => handleQuestionResponse(props, question);

    return (
        <div>
            <h1 className="govuk-heading-x1">{question.getQuestionString()}</h1>
            <br />
            <form>
                <input className="govuk-input govuk-input--width-10" type="text" name={question.getId().toString()} onChange={(text): void => handleTextChange(text.target.value, question, dispatch)}/>
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

function getReactiveContent(props: QuestionnaireProps, question: Question | undefined, dispatch: Dispatch<LoanSegment>): ReactElement {
    return (question === undefined) ? undefinedQuestionElement() : generateSuccessfulQuestion(props, question, dispatch);
}

export const Questionnaire: React.FC<QuestionnaireProps> = (props: QuestionnaireProps) => {
    const dispatch: Dispatch<LoanSegment> = useDispatch();
    const question: Question | undefined = getQuestionFromArray(props.match.params.questionId);
    const reactiveContent: ReactElement = getReactiveContent(props, question, dispatch);

    return (
        <MainContent breadcrumbData={getPageBreadcrumbProps(question)} reactiveContent={reactiveContent} />
    );
};
