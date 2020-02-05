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
    beerPints: number;
    cigarettePacks: number;
    pygmyGoatKids: number;
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
        let pintsOfBeer, cigarettePacks, pygmyGoatKids: number;
        let monthlyPayment: string, totalCost: string;

        if (process.env.REACT_APP_LOAN_CALCULATOR_LOCAL) {
            const loanCalculator: LoanCalculator = Loan.of(questionState.amount, questionState.interest, questionState.time);
            monthlyPayment = loanCalculator.getIncrementPaymentCost().toFixed(2);
            totalCost = loanCalculator.getTotalPaymentCost().toFixed(2);
            pintsOfBeer = loanCalculator.getBeerCount();
            cigarettePacks = loanCalculator.getCigarettePackCount();
            pygmyGoatKids = loanCalculator.getPygmyGoatKidCount();

        } else {
            getResults(dispatch, questionState);

            if (resultState.result === undefined) {
                monthlyPayment = "I'M BROKE";
                totalCost = "I'M NOT WELL";
                pintsOfBeer = 0;
                cigarettePacks = 0;
                pygmyGoatKids = 0;
            } else {
                monthlyPayment = resultState.result.monthlyPayment.toFixed(2);
                totalCost = resultState.result.totalCost.toFixed(2);
                pintsOfBeer = resultState.result.beerPints;
                cigarettePacks = resultState.result.cigarettePacks;
                pygmyGoatKids = resultState.result.pygmyGoatKids;
            }
        }

        result = (
            <div>
                <h1 className="govuk-heading-x1">Your Questionnaire Results</h1>
                <ul className="govuk-list govuk-list--bullet">
                    <li>Loan Amount: £{questionState.amount.getTotal().toFixed(2)}</li>
                    <li>Loan Interest Rate: {questionState.interest.getAnnualRate() * 100}%</li>
                    <li>Loan Length: {questionState.time.getMonthsTime()} Months</li>
                    <br/><br/>

                    <li>Incremental Payment: £{monthlyPayment}</li>
                    <li>Total Cost: £{totalCost}</li>
                    <br/>

                    <li>Monthly payment conversions: </li>
                    <ul>Pints of beer: {pintsOfBeer}</ul>
                    <ul>Packs of cigarettes: {cigarettePacks}</ul>
                    <ul>Number of pygmy goat kids(!!!): {pygmyGoatKids}</ul>
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
