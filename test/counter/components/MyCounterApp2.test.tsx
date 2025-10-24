import { fireEvent, render, screen } from '@testing-library/react';
import { MyCounterApp } from '../../../src/counter/components/MyCounterApp';

const handleAddMock = vi.fn();
const handleSubtractMock = vi.fn();
const handleResetMock = vi.fn();

vi.mock('../../../src/gifs/hooks/useCounter', () => {
  return {
    useCounter: () => ({
      counter: 20,
      handleAdd: handleAddMock,
      handleSubtract: handleSubtractMock,
      handleReset: handleResetMock,
    }),
  };
});

describe('<MyCounterApp2 />', () => {
  it('renders correctly', () => {
    render(<MyCounterApp />);

    expect(screen.getByText('Counter: 20')).toBeTruthy();
    expect(screen.getByText('+1')).toBeTruthy();
    expect(screen.getByText('-1')).toBeTruthy();
    expect(screen.getByText('Reset')).toBeTruthy();
  });

  it('should increment by one', () => {
    render(<MyCounterApp />);

    const btnIncrement = screen.getByText('+1');
    fireEvent.click(btnIncrement);

    expect(handleAddMock).toHaveBeenCalled();
  });

  it('should decrement by one', () => {
    render(<MyCounterApp />);

    const btnDecrement = screen.getByText('-1');
    fireEvent.click(btnDecrement);

    expect(handleSubtractMock).toHaveBeenCalled();
  });

  it('should reset count', async () => {
    render(<MyCounterApp />);

    const btnIncrement = screen.getByText('+1');
    fireEvent.click(btnIncrement);
    expect(handleAddMock).toHaveBeenCalled();

    const btnReset = screen.getByText('Reset');
    fireEvent.click(btnReset);
    expect(handleResetMock).toHaveBeenCalled();
  });
});
