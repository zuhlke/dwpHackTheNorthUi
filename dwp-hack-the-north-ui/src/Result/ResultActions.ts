import {Dispatch} from "redux";
import {RecordResultsActions, storeResults, retrieveResults} from "../reducers/ResultReducer";
import {AnswerState} from "../reducers/AnswerReducer";
import {Result} from "./Result";
import { LoanCalculator, Loan } from "./Calculator/Loan";

export function getResults(dispatch: Dispatch<RecordResultsActions>, answers: AnswerState): void {
    dispatch(retrieveResults());
    if (process.env.REACT_APP_LOAN_CALCULATOR_LOCAL) {
        if (answers.amount !== undefined && answers.interest !== undefined && answers.time !== undefined) {
            const loanCalculator: LoanCalculator = Loan.of(answers.amount, answers.interest, answers.time);
            const result: Result = {
                monthlyPayment: loanCalculator.getIncrementPaymentCost(),
                totalCost: loanCalculator.getTotalPaymentCost(),
                beerPints: loanCalculator.getBeerCount(),
                cigarettePacks: loanCalculator.getCigarettePackCount(),
                pygmyGoatKids: loanCalculator.getPygmyGoatKidCount()
            };
            dispatch(storeResults(result));
        }
    } else {
        fetch('https://k9s9szlula.execute-api.eu-west-2.amazonaws.com/dev/loanresult', {
            method: "POST",
            headers: {
                "Accept": "application/json",
            },
            body: JSON.stringify({loanAmount: answers.amount?.getTotal(), loanInterest: answers.interest?.getAnnualRate(), loanMonths: answers.time?.getMonthsTime()}),
        })
            .then((response) => {
                return response.json().then(json => {
                    if (response.ok) {
                        return json
                    } else {
                        return Promise.reject({message: json.message})
                    }
                })
            })
            .then((myJson) => {
                const result: Result = {
                    monthlyPayment: myJson.monthlyPayment,
                    totalCost: myJson.totalCost,
                    beerPints: myJson.beerPints,
                    cigarettePacks: myJson.cigarettePacks,
                    pygmyGoatKids: myJson.pygmyGoatKids
                };
                dispatch(storeResults(result));
            }).catch((error) => {
            console.log("Something went wrong " + error.message)
        })
    }
}
