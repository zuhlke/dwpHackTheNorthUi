import React, {FC} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {BreadcrumbListProps} from '../common/Breadcrumb/Breadcrumb';
import {MainContent} from '../common/Content/MainContent';
import {ReducerState} from '../reducers/Reducer';
import {AnswerState} from "../reducers/AnswerReducer";
import {Dispatch} from "redux";
import {RecordResultsActions, ResultState} from "../reducers/ResultReducer";
import {getResults} from "./ResultActions";
import {Loan, LoanCalculator} from "./Calculator/Loan";

export interface Result {
    monthlyPayment: number;
    totalCost: number;
}

function getBreadcrumbInformation(): BreadcrumbListProps {
    return {
        currentItem: {visibleText: 'Results'},
        parentItems: [
            {href: '/', visibleText: 'Home'},
        ]
    };
}

const Content: FC = () => {
    const dispatch: Dispatch<RecordResultsActions> = useDispatch();
    let result = (<div/>);
    const resultState: ResultState = useSelector( (state: ReducerState) => state.results);
    const questionState: AnswerState = useSelector((state: ReducerState) => state.answers);
    if (questionState.amount !== undefined && questionState.interest !== undefined && questionState.time !== undefined) {
        const loanCalculator: LoanCalculator = Loan.of(questionState.amount, questionState.interest, questionState.time);
        getResults(dispatch, questionState);
        result = (
            <div>
                <h1 className="govuk-heading-x1">Your Questionnaire Results</h1>
                <ul className="govuk-list govuk-list--bullet">
                    <li>Loan Amount: £{questionState.amount.getTotal().toFixed(2)}</li>
                    <li>Loan Interest Rate: {questionState.interest.getAnnualRate() * 100}%</li>
                    <li>Loan Length: {questionState.time.getMonthsTime()} Months</li>
                    <br/><br/>
                    {process.env.REACT_APP_LOAN_CALCULATOR_LOCAL ?
                        <div>
                            <li>Incremental Payment: £{loanCalculator.getIncrementPaymentCost().toFixed(2)}</li>
                            <li>Total Cost: £{loanCalculator.getTotalPaymentCost().toFixed(2)}</li>
                        </div>
                        : <div>
                            <li>Incremental Payment: £{resultState.result?.monthlyPayment.toFixed(2)}</li>
                            <li>Total Cost: £{resultState.result?.totalCost.toFixed(2)} </li>
                        </div>
                    }
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
