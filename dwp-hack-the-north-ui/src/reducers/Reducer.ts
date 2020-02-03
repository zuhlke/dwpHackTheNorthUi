import {questionReducer, QuestionState, SAVE_QUESTIONS, StoreActions} from "./QuestionReducer";
import {
    LOAN_SEGMENT_AMOUNT,
    LOAN_SEGMENT_INTEREST,
    LOAN_SEGMENT_TIME,
    LoanSegmentActions,
    userInputReducer,
    UserInputState
} from "./UserInputReducer";

export type Actions = LoanSegmentActions | StoreActions;

export interface ReducerState {
    userInput: UserInputState;
    questions: QuestionState;
}

const initialState: ReducerState = {
    userInput: {},
    questions: {questions:[]}
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
        default:
            result = state;
            break;
    }

    return result;
};
