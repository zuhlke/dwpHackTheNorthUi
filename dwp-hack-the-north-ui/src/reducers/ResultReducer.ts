import {Action} from 'redux';
import {Result} from "../Result/Result";

export const RECORD_RESULTS = "RECORD_RESULTS";
export const RETRIEVE_RESULTS = "RETRIEVE_RESULTS";

type RetrieveResultsAction = Action;

interface RecordResultsAction extends Action {
    payload: Result;
}

export type RecordResultsActions = RecordResultsAction | RetrieveResultsAction;

export function storeResults(result: Result): RecordResultsActions {
    return {
        type: RECORD_RESULTS,
        payload: result
    };
}

export function retrieveResults(): RetrieveResultsAction {
    return {
        type: RETRIEVE_RESULTS
    }
}

export interface ResultState {
    result?: Result;
    busy: boolean;
}

export const resultReducer =  (state: ResultState, action: RecordResultsActions): ResultState => {
    let result: ResultState;
    switch (action.type) {
        case RECORD_RESULTS:
            result = Object.assign({}, state, {
                result: (action as RecordResultsAction).payload,
                busy: false
            });
            break;
        case RETRIEVE_RESULTS:
            result = Object.assign({}, state, {
                busy: true
            });
            break;
        default:
            result = state;
    }

    return result;
};
