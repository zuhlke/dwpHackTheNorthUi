import {Dispatch} from "redux";
import {QuestionActions, recordQuestions, retrievingQuestions} from "../reducers/QuestionReducer";
import {Question} from "./Question/Question";
import { QuestionRepository, InMemoryQuestionRepository } from "./Question/QuestionRepo";

export function getQuestions(dispatch: Dispatch<QuestionActions>): void {
    dispatch(retrievingQuestions());
    if (process.env.REACT_APP_LOAN_CALCULATOR_LOCAL) {
        const questionRepo: QuestionRepository = InMemoryQuestionRepository.createDefaultInstance();
        dispatch(recordQuestions(questionRepo.getAll()));
    } else {
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
                    questions.push(Question.of(question.Id, question.Text));
                }
                dispatch(recordQuestions(questions))
            }).catch((error) => {
            console.log("Something went wrong " + error.message)
        })
    }
}
