import {Action} from 'redux';
import {LoanAmount, LoanInterest, LoanTime} from '../Result/Calculator/Loan';

export const RECORD_LOAN_AMOUNT = "RECORD_LOAN_AMOUNT";
export const RECORD_LOAN_INTEREST = "RECORD_LOAN_INTEREST";
export const RECORD_LOAN_TIME = "RECORD_LOAN_TIME";

interface RecordLoanAmountAction extends Action {
    payload: LoanAmount;
}

interface RecordLoanInterestAction extends Action {
    payload: LoanInterest;
}

interface RecordLoanTimeAction extends Action {
    payload: LoanTime;
}

export type RecordLoanActions = RecordLoanAmountAction | RecordLoanInterestAction | RecordLoanTimeAction;

export function recordLoanAmount(userInput: string): RecordLoanAmountAction {
    const userInputNumeral = parseInt(userInput);

    return {
        type: RECORD_LOAN_AMOUNT,
        payload: LoanAmount.from(userInputNumeral)
    };
}

export function recordLoanInterest(userInput: string): RecordLoanInterestAction {
    const userInputNumeral = (parseInt(userInput) / 100);

    return {
        type: RECORD_LOAN_INTEREST,
        payload: LoanInterest.monthlyCompoundWithAnnualRate(userInputNumeral)
    };
}

export function recordLoanTime(userInput: string): RecordLoanTimeAction {
    const userInputNumeral = parseInt(userInput);

    return {
        type: RECORD_LOAN_TIME,
        payload: LoanTime.months(userInputNumeral)
    };
}

export interface AnswerState {
    amount?: LoanAmount;
    interest?: LoanInterest;
    time?: LoanTime;
}

export const answerReducer = (state: AnswerState, action: RecordLoanActions): AnswerState => {
    let result: AnswerState;

    switch (action.type) {
        case RECORD_LOAN_AMOUNT:
            result = Object.assign({}, state, {
                amount: action.payload,
            });
            break;
        case RECORD_LOAN_INTEREST:
            result = Object.assign({}, state, {
                interest: action.payload,
            });
            break;
        case RECORD_LOAN_TIME:
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
