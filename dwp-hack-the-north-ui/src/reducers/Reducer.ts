import {Action} from 'redux';
import {LoanAmount, LoanInterest, LoanTime} from '../Result/Calculator/Loan';
import {Question} from "../Questionnaire/Question/Question";

export const LOAN_SEGMENT_AMOUNT = "LOAN_SEGMENT_AMOUNT";
export const LOAN_SEGMENT_INTEREST = "LOAN_SEGMENT_INTEREST";
export const LOAN_SEGMENT_TIME = "LOAN_SEGMENT_TIME";
export const SAVE_QUESTIONS = "SAVE_QUESTIONS";

interface LoanAmountAction extends Action {
    payload: LoanAmount;
}

interface LoanInterestAction extends Action {
    payload: LoanInterest;
}

interface LoanTimeAction extends Action {
    payload: LoanTime;
}

interface StoreQuestionsAction extends Action {
    payload: Question[];
}

export type LoanSegmentActions = LoanAmountAction | LoanInterestAction | LoanTimeAction;
export type StoreActions = StoreQuestionsAction;
export type Actions = LoanSegmentActions | StoreActions;

export function loanAmount(userInput: string): LoanAmountAction {
    const userInputNumeral = parseInt(userInput);

    return {
        type: LOAN_SEGMENT_AMOUNT,
        payload: LoanAmount.from(userInputNumeral)
    };
}

export function loanInterest(userInput: string): LoanInterestAction {
    const userInputNumeral = (parseInt(userInput) / 100);

    return {
        type: LOAN_SEGMENT_INTEREST,
        payload: LoanInterest.monthlyCompoundWithAnnualRate(userInputNumeral)
    };
}

export function loanTime(userInput: string): LoanTimeAction {
    const userInputNumeral = parseInt(userInput);

    return {
        type: LOAN_SEGMENT_TIME,
        payload: LoanTime.months(userInputNumeral)
    };
}

export function storeQuestions(questions: Question[]): StoreQuestionsAction {
    return {
        type: SAVE_QUESTIONS,
        payload: questions
    };
}

export interface UserInputState {
    amount?: LoanAmount;
    interest?: LoanInterest;
    time?: LoanTime;
}

export interface ReducerState {
    userInput: UserInputState;
    questions: QuestionState;
}

export interface QuestionState {
    questions: Question[];
}

const initialState: ReducerState = {
    userInput: {},
    questions: {questions:[]}
};

const questionReducer =  (state: QuestionState, action: Actions): QuestionState => {
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

const userInputReducer = (state: UserInputState, action: Actions): UserInputState => {
    let result: UserInputState;

    switch (action.type) {
        case LOAN_SEGMENT_AMOUNT:
            result = Object.assign({}, state, {
                amount: action.payload,
            });
            break;
        case LOAN_SEGMENT_INTEREST:
            result = Object.assign({}, state, {
                interest: action.payload,
            });
            break;
        case LOAN_SEGMENT_TIME:
            result = Object.assign({}, state, {
                time: action.payload
            });
            break;
        default:
            result = state;
            break;
    }

    return result;
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
