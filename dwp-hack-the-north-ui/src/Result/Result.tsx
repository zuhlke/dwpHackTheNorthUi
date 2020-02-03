import React, {FC} from 'react';
import {useSelector} from 'react-redux';
import {BreadcrumbListProps} from '../common/Breadcrumb/Breadcrumb';
import {MainContent} from '../common/Content/MainContent';
import {ReducerState} from '../reducers/Reducer';
import {Loan, LoanCalculator} from './Calculator/Loan';
import {UserInputState} from "../reducers/UserInputReducer";

function getBreadcrumbInformation(): BreadcrumbListProps {
    return {
        currentItem: {visibleText: 'Results'},
        parentItems: [
            {href: '/', visibleText: 'Home'},
        ]
    };
}

const Content: FC = () => {
    let result = (<div/>);
    const questionState: UserInputState = useSelector((state: ReducerState) => state.userInput);
    if (questionState.amount !== undefined && questionState.interest !== undefined && questionState.time !== undefined) {
        const loanCalculator: LoanCalculator = Loan.of(questionState.amount, questionState.interest, questionState.time);

        result = (
            <div>
                <h1 className="govuk-heading-x1">Your Questionnaire Results</h1>
                <ul className="govuk-list govuk-list--bullet">
                    <li>Loan Amount: £{questionState.amount.getTotal().toFixed(2)}</li>
                    <li>Loan Interest Rate: {questionState.interest.getAnnualRate() * 100}%</li>
                    <li>Loan Length: {questionState.time.getMonthsTime()} Months</li>
                    <br/><br/>
                    <li>Incremental Payment: £{loanCalculator.getIncrementPaymentCost().toFixed(2)}</li>
                    <li>Total Cost: £{loanCalculator.getTotalPaymentCost().toFixed(2)}</li>
                </ul>
            </div>
        );
    }

    return result;
};

export const Result: FC = () => {
    return (
        <div>
            <MainContent breadcrumbData={getBreadcrumbInformation()} reactiveContent={<Content/> }/>
        </div>
    );
};
