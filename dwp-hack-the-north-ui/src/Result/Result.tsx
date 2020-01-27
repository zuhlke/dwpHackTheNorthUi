import React, {FC} from 'react';
import {useSelector} from 'react-redux';
import {BreadcrumbListProps} from '../common/Breadcrumb/Breadcrumb';
import {MainContent} from '../common/Content/MainContent';
import {QuestionState} from '../reducers/QuestionState';
import {Loan, LoanCalculator} from './Calculator/Loan';

function getBreadcrumbInformation(): BreadcrumbListProps {
    return {
        currentItem: {visibleText: 'Results'},
        parentItems: [
            {href: '/', visibleText: 'Home'},
        ]
    };
}

const Content: FC = () => {
    const questionState: QuestionState = useSelector((state: QuestionState) => state);
    let loanCalculator: LoanCalculator | undefined;
    if (questionState.amount !== undefined && questionState.interest !== undefined && questionState.time !== undefined) {
        loanCalculator = Loan.of(questionState.amount, questionState.interest, questionState.time);
    } else {
        loanCalculator = undefined;
    }

    return (
        <div>
            <h1 className="govuk-heading-x1">Your Questionnaire Results</h1>
            <ul className="govuk-list govuk-list--bullet">
                <li>Loan Amount: £{questionState.amount?.getTotal()}</li>
                <li>Loan Interest Rate: {questionState.interest?.getAnnualRate()}%</li>
                <li>Loan Length: {questionState.time?.getMonthsTime()} Months</li>
                <br/><br/>
                <li>Incremental Payment: {loanCalculator?.getIncrementPaymentCost()}</li>
                <li>Total Cost: {loanCalculator?.getTotalPaymentCost()}</li>
            </ul>
        </div>
    );
};

export const Result: FC = () => {
    return (
        <div>
            <MainContent breadcrumbData={getBreadcrumbInformation()} reactiveContent={<Content/> }/>
        </div>
    );
};
