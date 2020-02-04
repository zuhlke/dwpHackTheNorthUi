import React from 'react';
import {render} from '@testing-library/react';
import {App} from './App';
import {createStore} from 'redux';
import {initialState, ReducerState} from './reducers/Reducer';
import {Provider} from 'react-redux';
import {RECORD_LOAN_AMOUNT, AnswerActions} from "./reducers/AnswerReducer";

const testReducer = (state: ReducerState = initialState, action: AnswerActions): ReducerState => {
  let result = state;

  if (action.type === RECORD_LOAN_AMOUNT) {
    result = Object.assign({}, state, {
      amount: action.payload,
      interest: state.answers.interest,
      time: state.answers.time
    });
  }

  return result;
};

const testStore = createStore(testReducer);

test('renders learn react link', async () => {
  const { getAllByText } = render(
    <Provider store={testStore}>
      <App/>
    </Provider>);

  const linkElement: HTMLElement[] = getAllByText(/Loan calculator/i);
  expect(linkElement.length).toBe(2);
});
