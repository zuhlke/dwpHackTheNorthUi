import {questionReducer, QuestionState, SAVE_QUESTIONS, StoreActions} from "./QuestionReducer";
import {
    LOAN_SEGMENT_AMOUNT,
    LOAN_SEGMENT_INTEREST,
    LOAN_SEGMENT_TIME,
    LoanSegmentActions,
    userInputReducer,
    UserInputState
} from "./UserInputReducer";
import {ResultActions, resultReducer, ResultState, SAVE_RESULTS} from "./ResultReducer";

export type Actions = LoanSegmentActions | StoreActions | ResultActions;

export interface ReducerState {
    userInput: UserInputState;
    questions: QuestionState;
    results: ResultState;
}

const initialState: ReducerState = {
    userInput: {},
    questions: {questions:[]},
    results: {}
};

export const reducer = (state: ReducerState = initialState, action: Actions): ReducerState => {
    let result: ReducerState;

    switch (action.type) {
        case LOAN_SEGMENT_AMOUNT:
        case LOAN_SEGMENT_INTEREST:
        case LOAN_SEGMENT_TIME:
            result = Object.assign({}, state, {
                userInput: userInputReducer(state.userInput, action)
            });
            break;
        case SAVE_QUESTIONS:
            result = Object.assign({}, state, {
                questions: questionReducer(state.questions, action)
            });
            break;
        case SAVE_RESULTS:
            result = Object.assign({}, state, {
                results: resultReducer(state.results, action)
            });
            break;
        default:
            result = state;
            break;
    }

    return result;
};
