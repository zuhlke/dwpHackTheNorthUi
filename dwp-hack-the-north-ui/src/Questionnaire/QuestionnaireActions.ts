import {Dispatch} from "redux";
import {StoreActions, storeQuestions} from "../reducers/QuestionReducer";
import {Question} from "./Question/Question";

export function getQuestions(dispatch: Dispatch<StoreActions>) {

    fetch('https://k9s9szlula.execute-api.eu-west-2.amazonaws.com/dev/questions', {
        method: "GET",
        headers: {
            "Accept": "application/json",
        },
    })
        .then((response) => {
            console.log(response);
            return response.json().then(json => {
                if (response.ok) {
                    return json
                } else {
                    return Promise.reject({message: json.message})
                }
            })
        })
        .then((myJson) => {
            console.log(myJson);
            const questions: Question[] = [];
            for (const question of myJson) {
                questions.push(Question.ofJson(question));
            }
            dispatch(storeQuestions(questions))
        }).catch((error) => {
        console.log("Something went wrong " + error.message)
    })

}
