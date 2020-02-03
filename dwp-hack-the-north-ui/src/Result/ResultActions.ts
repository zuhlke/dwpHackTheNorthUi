import {Dispatch} from "redux";
import {Result, ResultActions, storeResults} from "../reducers/ResultReducer";
import {UserInputState} from "../reducers/UserInputReducer";

export function getResults(dispatch: Dispatch<ResultActions>, answers: UserInputState) {

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