import {Action} from 'redux';
import {Result} from "../Result/Result";

export const RECORD_RESULTS = "RECORD_RESULTS";

interface RecordResultsAction extends Action {
    payload: Result;
}

export type RecordResultsActions = RecordResultsAction;

export function storeResults(result: Result): RecordResultsActions {
    return {
        type: RECORD_RESULTS,
        payload: result
    };
}

export interface ResultState {
    result?: Result;
}

export const resultReducer =  (state: ResultState, action: RecordResultsActions): ResultState => {
    let result: ResultState;
    if (action.type === RECORD_RESULTS) {
        result = Object.assign({}, state, {
            result: action.payload,
        });
    } else {
        result = state;
    }

    return result;
};
