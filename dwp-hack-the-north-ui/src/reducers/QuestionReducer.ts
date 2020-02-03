import {Action} from 'redux';
import {Question} from "../Questionnaire/Question/Question";
import {Actions} from "./Reducer";

export const SAVE_QUESTIONS = "SAVE_QUESTIONS";

export interface StoreQuestionsAction extends Action {
    payload: Question[];
}

export type StoreActions = StoreQuestionsAction;

export function storeQuestions(questions: Question[]): StoreQuestionsAction {
    return {
        type: SAVE_QUESTIONS,
        payload: questions
    };
}

export interface QuestionState {
    questions: Question[];
}

export const questionReducer =  (state: QuestionState, action: Actions): QuestionState => {
    let result: QuestionState;
    switch (action.type) {
        case SAVE_QUESTIONS:
            result = Object.assign({}, state, {
                questions: action.payload,
            });
            break;
        default:
            result = state;
            break;
    }

    return result;
};
