import {Action} from 'redux';
import {Question} from "../Questionnaire/Question/Question";

export const RETRIEVING_QUESTIONS = "RETRIEVING_QUESTIONS";
export const RECORD_QUESTIONS = "RECORD_QUESTIONS";

export type RetrievingQuestionsAction = Action;

export interface RecordQuestionsAction extends Action {
    payload: Question[];
}

export type QuestionActions = RetrievingQuestionsAction | RecordQuestionsAction;

export function retrievingQuestions(): RetrievingQuestionsAction {
    return {
        type: RETRIEVING_QUESTIONS,
    };
}

export function recordQuestions(questions: Question[]): RecordQuestionsAction {
    return {
        type: RECORD_QUESTIONS,
        payload: questions,
    };
}

export interface QuestionState {
    questions: Question[];
    busy: boolean;
}

export const questionReducer =  (state: QuestionState, action: QuestionActions): QuestionState => {
    let result: QuestionState;
    switch (action.type) {
        case RETRIEVING_QUESTIONS:
            result = Object.assign({}, state, {
                busy: true
            });
            break;
        case RECORD_QUESTIONS:
            result = Object.assign({}, state, {
                questions: (action as RecordQuestionsAction).payload,
                busy: false
            });
            break;
        default:
            result = state;
    }

    return result;
};
