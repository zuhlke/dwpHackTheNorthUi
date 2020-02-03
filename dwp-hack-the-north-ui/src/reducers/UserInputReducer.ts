import {Action} from 'redux';
import {LoanAmount, LoanInterest, LoanTime} from '../Result/Calculator/Loan';
import {Actions} from "./Reducer";

export const LOAN_SEGMENT_AMOUNT = "LOAN_SEGMENT_AMOUNT";
export const LOAN_SEGMENT_INTEREST = "LOAN_SEGMENT_INTEREST";
export const LOAN_SEGMENT_TIME = "LOAN_SEGMENT_TIME";

interface LoanAmountAction extends Action {
    payload: LoanAmount;
}

interface LoanInterestAction extends Action {
    payload: LoanInterest;
}

interface LoanTimeAction extends Action {
    payload: LoanTime;
}

export type LoanSegmentActions = LoanAmountAction | LoanInterestAction | LoanTimeAction;

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

export interface UserInputState {
    amount?: LoanAmount;
    interest?: LoanInterest;
    time?: LoanTime;
}

export const userInputReducer = (state: UserInputState, action: Actions): UserInputState => {
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
