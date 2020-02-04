import {Dispatch} from "redux";
import {RecordResultsActions, storeResults} from "../reducers/ResultReducer";
import {AnswerState} from "../reducers/AnswerReducer";
import {Result} from "./Result";

export function getResults(dispatch: Dispatch<RecordResultsActions>, answers: AnswerState) {

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
            const result: Result = { monthlyPayment: myJson.monthlyPayment, totalCost: myJson.totalCost };
            dispatch(storeResults(result));
        }).catch((error) => {
        console.log("Something went wrong " + error.message)
    })

}