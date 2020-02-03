import {Action} from 'redux';
import {LoanAmount, LoanInterest, LoanTime} from '../Result/Calculator/Loan';

export const LOAN_SEGMENT_AMOUNT = "LOAN_SEGMENT_AMOUNT";
export const LOAN_SEGMENT_INTEREST = "LOAN_SEGMENT_INTEREST";
export const LOAN_SEGMENT_TIME = "LOAN_SEGMENT_TIME";

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

export type LoanSegment = LoanAmountSegment | LoanInterestSegment | LoanTimeSegment;

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

export interface UserInput {
    amount?: LoanAmount;
    interest?: LoanInterest;
    time?: LoanTime;
}

export interface ReducerState {
    userInput: UserInput;
}

const initialState: ReducerState = {
    userInput: {}
};

const userInputReducer = (state: UserInput, action: LoanSegment): UserInput => {
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

export const reducer = (state: ReducerState = initialState, action: LoanSegment): ReducerState => {
    let result: ReducerState;

    switch (action.type) {
        case LOAN_SEGMENT_AMOUNT:
        case LOAN_SEGMENT_INTEREST:
        case LOAN_SEGMENT_TIME:
            result = Object.assign({}, state, {
                userInput: userInputReducer(state.userInput, action)
            });
            break;
        default:
            result = state;
            break;
    }

    return result;
};
