import { Action } from 'redux';
import { LoanAmount, LoanInterest, LoanTime } from '../Result/Calculator/Loan';

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
    const userInputNumeral = parseInt(userInput);

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

export interface QuestionState {
    amount?: LoanAmount;
    interest?: LoanInterest;
    time?: LoanTime;
}

export const questionReducer = (state: QuestionState = {}, action: LoanSegment): QuestionState => {
    let result: QuestionState;

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
