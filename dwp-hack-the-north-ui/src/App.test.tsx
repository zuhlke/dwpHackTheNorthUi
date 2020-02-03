import React from 'react';
import {render} from '@testing-library/react';
import {App} from './App';
import {createStore} from 'redux';
import {LOAN_SEGMENT_AMOUNT, LoanSegment, UserInput} from './reducers/Reducer';
import {Provider} from 'react-redux';

const testReducer = (state: UserInput = {}, action: LoanSegment): UserInput => {
  let result = state;

  if (action.type === LOAN_SEGMENT_AMOUNT) {
    result = Object.assign({}, state, {
      amount: action.payload,
      interest: state.interest,
      time: state.time
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
