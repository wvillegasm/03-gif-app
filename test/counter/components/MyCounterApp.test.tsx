import { render, screen } from '@testing-library/react';

import { MyCounterApp } from '../../../src/counter/components/MyCounterApp';

describe('CounterApp', () => {
  it('should render correctly', () => {
    render(<MyCounterApp />);

    expect(screen.getByRole('heading', { level: 1 }).innerHTML).toEqual(
      'Counter: 5',
    );

    expect(screen.getByRole('button', { name: '+1' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '-1' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Reset' })).toBeInTheDocument();
  });

  it('should increment the counter', () => {
    render(<MyCounterApp />);
  });

  it('should decrement the counter', () => {
    // Test decrement functionality
  });

  it('should reset the counter', () => {
    // Test reset functionality
  });
});
