import React, {FC} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {BreadcrumbListProps} from '../common/Breadcrumb/Breadcrumb';
import {MainContent} from '../common/Content/MainContent';
import {ReducerState} from '../reducers/Reducer';
import {AnswerState} from "../reducers/AnswerReducer";
import {Dispatch} from "redux";
import {RecordResultsActions, ResultState} from "../reducers/ResultReducer";
import {getResults} from "./ResultActions";

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
    const answerState: AnswerState = useSelector((state: ReducerState) => state.answers);
    if (answerState.amount !== undefined && answerState.interest !== undefined && answerState.time !== undefined) {
        if (resultState.result === undefined) {
            getResults(dispatch, answerState);
        }
        result = (
            <div>
                <h1 className="govuk-heading-x1">Your Questionnaire Results</h1>
                <ul className="govuk-list govuk-list--bullet">
                    <li>Loan Amount: £{answerState.amount.getTotal().toFixed(2)}</li>
                    <li>Loan Interest Rate: {answerState.interest.getAnnualRate() * 100}%</li>
                    <li>Loan Length: {answerState.time.getMonthsTime()} Months</li>
                    <br/><br/>

                    <li>Incremental Payment: £{resultState.result?.monthlyPayment}</li>
                    <li>Total Cost: £{resultState.result?.totalCost}</li>
                    <br/>

                    <li>Monthly payment conversions: </li>
                    <ul>Pints of beer: {resultState.result?.beerPints}</ul>
                    <ul>Packs of cigarettes: {resultState.result?.cigarettePacks}</ul>
                    <ul>Number of pygmy goat kids(!!!): {resultState.result?.pygmyGoatKids}</ul>
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
