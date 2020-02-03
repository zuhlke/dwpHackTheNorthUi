import {Action} from 'redux';
import {Actions} from "./Reducer";

export const SAVE_RESULTS = "SAVE_RESULTS";

interface Result {
    monthlyPayment: number;
    totalCost: number;
}

interface SaveResultsAction extends Action {
    payload: Result;
}

export type ResultActions = SaveResultsAction;

export function storeResults(result: Result): ResultActions {
    return {
        type: SAVE_RESULTS,
        payload: result
    };
}

export interface ResultState {
    result?: Result;
}

export const resultReducer =  (state: ResultState, action: Actions): ResultState => {
    let result: ResultState;
    switch (action.type) {
        case SAVE_RESULTS:
            result = Object.assign({}, state, {
                result: action.payload,
            });
            break;
        default:
            result = state;
            break;
    }

    return result;
};
