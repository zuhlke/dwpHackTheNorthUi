import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { createStore } from 'redux';
import { QuestionState, LoanSegment, LOAN_SEGMENT_AMOUNT } from './reducers/QuestionState';
import { Provider } from 'react-redux';

const testReducer = (state: QuestionState = {}, action: LoanSegment): QuestionState => {
  let result = state;
  
  switch (action.type) {
    case LOAN_SEGMENT_AMOUNT:
      result = Object.assign({}, state, {
        amount: action.payload,
        interest: state.interest,
        time: state.time
      });
      break;
  }

  return result;
}

const testStore = createStore(testReducer);

test('renders learn react link', async () => {
  const { getAllByText } = render(
    <Provider store={testStore}>
      <App/>
    </Provider>);

  const linkElement: HTMLElement[] = getAllByText(/Loan calculator/i);
  expect(linkElement.length).toBe(2);
});
