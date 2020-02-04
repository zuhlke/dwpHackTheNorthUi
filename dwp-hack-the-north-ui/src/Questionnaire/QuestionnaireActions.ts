import {Dispatch} from "redux";
import {RecordQuestionsActions, recordQuestions} from "../reducers/QuestionReducer";
import {Question} from "./Question/Question";

export function getQuestions(dispatch: Dispatch<RecordQuestionsActions>) {

    fetch('https://k9s9szlula.execute-api.eu-west-2.amazonaws.com/dev/questions', {
        method: "GET",
        headers: {
            "Accept": "application/json",
        },
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
            const questions: Question[] = [];
            for (const question of myJson) {
                questions.push(Question.ofJson(question));
            }
            dispatch(recordQuestions(questions))
        }).catch((error) => {
        console.log("Something went wrong " + error.message)
    })

}
