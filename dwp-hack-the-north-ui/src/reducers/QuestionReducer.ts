import {Action} from 'redux';
import {Question} from "../Questionnaire/Question/Question";

export const RECORD_QUESTIONS = "RECORD_QUESTIONS";

export interface RecordQuestionsAction extends Action {
    payload: Question[];
}

export type RecordQuestionsActions = RecordQuestionsAction;

export function recordQuestions(questions: Question[]): RecordQuestionsAction {
    return {
        type: RECORD_QUESTIONS,
        payload: questions
    };
}

export interface QuestionState {
    questions: Question[];
}

export const questionReducer =  (state: QuestionState, action: RecordQuestionsActions): QuestionState => {
    let result: QuestionState;
    if (action.type === RECORD_QUESTIONS) {
        result = Object.assign({}, state, {
            questions: action.payload,
        });
    } else {
        result = state;
    }

    return result;
};
