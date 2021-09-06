import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { createMemoryHistory } from 'history';

test('renders learn react link', () => {
    const { getByText } = render(<App history={createMemoryHistory()} />);
});
