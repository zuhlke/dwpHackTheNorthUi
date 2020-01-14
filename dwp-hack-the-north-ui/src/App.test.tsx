import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders learn react link', async () => {
  const { getAllByText } = render(<App />);

  const linkElement: HTMLElement[] = getAllByText(/Loan calculator/i);
  expect(linkElement.length).toBe(2);
});
