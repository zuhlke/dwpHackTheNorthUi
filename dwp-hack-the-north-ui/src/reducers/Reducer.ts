import {Action} from 'redux';
import {LoanAmount, LoanInterest, LoanTime} from '../Result/Calculator/Loan';
import {Question} from "../Questionnaire/Question/Question";

export const LOAN_SEGMENT_AMOUNT = "LOAN_SEGMENT_AMOUNT";
export const LOAN_SEGMENT_INTEREST = "LOAN_SEGMENT_INTEREST";
export const LOAN_SEGMENT_TIME = "LOAN_SEGMENT_TIME";
export const SAVE_QUESTIONS = "SAVE_QUESTIONS";

interface LoanAmountSegment extends Action {
    payload: LoanAmount;
}

interface LoanInterestSegment extends Action {
    type: string;
    payload: LoanInterest;
}

interface LoanTimeSegment extends Action {
    type: string;
    payload: LoanTime;
}

interface StoreQuestions extends Action {
    type: string;
    payload: Question[];
}

export type LoanSegment = LoanAmountSegment | LoanInterestSegment | LoanTimeSegment;
export type StoreAction = StoreQuestions;
export type Actions = LoanSegment | StoreQuestions;

export function loanAmount(userInput: string): LoanSegment {
    const userInputNumeral = parseInt(userInput);

    return {
        type: LOAN_SEGMENT_AMOUNT,
        payload: LoanAmount.from(userInputNumeral)
    };
}

export function loanInterest(userInput: string): LoanSegment {
    const userInputNumeral = (parseInt(userInput) / 100);

    return {
        type: LOAN_SEGMENT_INTEREST,
        payload: LoanInterest.monthlyCompoundWithAnnualRate(userInputNumeral)
    };
}

export function loanTime(userInput: string): LoanSegment {
    const userInputNumeral = parseInt(userInput);

    return {
        type: LOAN_SEGMENT_TIME,
        payload: LoanTime.months(userInputNumeral)
    };
}

export function storeQuestions(questions: Question[]): StoreQuestions {
    return {
        type: SAVE_QUESTIONS,
        payload: questions
    };
}

export interface UserInput {
    amount?: LoanAmount;
    interest?: LoanInterest;
    time?: LoanTime;
}

export interface ReducerState {
    userInput: UserInput;
    questions: Questions;
}

export interface Questions {
    questions: Question[];
}

const initialState: ReducerState = {
    userInput: {},
    questions: {questions:[]}
};

const questionReducer =  (state: Questions, action: Actions): Questions => {
    let result: Questions;
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

const userInputReducer = (state: UserInput, action: Actions): UserInput => {
    let result: UserInput;

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
