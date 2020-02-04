import {questionReducer, QuestionState, RECORD_QUESTIONS, QuestionActions, RETRIEVING_QUESTIONS} from "./QuestionReducer";
import {
    RECORD_LOAN_AMOUNT,
    RECORD_LOAN_INTEREST,
    RECORD_LOAN_TIME,
    AnswerActions,
    answerReducer,
    AnswerState
} from "./AnswerReducer";
import {RecordResultsActions, resultReducer, ResultState, RECORD_RESULTS} from "./ResultReducer";

export type AllActions = AnswerActions | QuestionActions | RecordResultsActions;

export interface ReducerState {
    answers: AnswerState;
    questions: QuestionState;
    results: ResultState;
}

export const initialState: ReducerState = {
    answers: {},
    questions: {questions:[], busy: false},
    results: {}
};

export const reducer = (state: ReducerState = initialState, action: AllActions): ReducerState => {
    let result: ReducerState;

    switch (action.type) {
        case RECORD_LOAN_AMOUNT:
        case RECORD_LOAN_INTEREST:
        case RECORD_LOAN_TIME:
            result = Object.assign({}, state, {
                answers: answerReducer(state.answers, action as AnswerActions)
            });
            break;
        case RETRIEVING_QUESTIONS:
        case RECORD_QUESTIONS:
            result = Object.assign({}, state, {
                questions: questionReducer(state.questions, action as QuestionActions)
            });
            break;
        case RECORD_RESULTS:
            result = Object.assign({}, state, {
                results: resultReducer(state.results, action as RecordResultsActions)
            });
            break;
        default:
            result = state;
            break;
    }

    return result;
};
