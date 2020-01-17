import React, { ReactElement } from 'react';
import { connect, useSelector } from 'react-redux';
import { BreadcrumbListProps } from '../common/Breadcrumb/Breadcrumb';
import { MainContent } from '../common/Content/MainContent';
import { QuestionState } from '../reducers/QuestionState';
import { Loan, LoanCalculator } from './Calculator/Loan';

interface ResultProps {
    loan: LoanCalculator;
}

function getBreadcrumbInformation(): BreadcrumbListProps {
    return {
        currentItem: {visibleText: 'Results'},
        parentItems: [
            {href: '/', visibleText: 'Home'},
            {href: '/Questionnaire', visibleText: 'Questionnaire'}
        ]
    };
}

function getContent(props: ResultProps, questionState: QuestionState): ReactElement {
    return (
        <div>
            <h1 className="govuk-heading-x1">Your Questionnaire Results</h1>
            <ul className="govuk-list govuk-list--bullet">
                <li>Loan Amount: £{questionState.amount?.getTotal()}</li>
                <li>Loan Interest Rate: {questionState.interest?.getAnnualRate()}%</li>
                <li>Loan Length: {questionState.time?.getMonthsTime()} Months</li>
            </ul>
        </div>
    );
}

export const Result: React.FC<ResultProps> = (props: ResultProps) => {
    const reducerInformation: QuestionState = useSelector((state: QuestionState) => state);
    return (
        <div>
            <MainContent breadcrumbData={getBreadcrumbInformation()} reactiveContent={getContent(props, reducerInformation)}/>
        </div>
    );
};

const mapStateToProps = (state: QuestionState): ResultProps | undefined => {
    if (state.amount !== undefined && state.interest !== undefined && state.time !== undefined) {
        return {
            loan: Loan.of(state.amount, state.interest, state.time),
        };
    }

    return 
};

export default connect(mapStateToProps)(Result);