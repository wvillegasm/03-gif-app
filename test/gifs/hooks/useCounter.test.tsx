import { act, renderHook } from '@testing-library/react';

import { useCounter } from '../../../src/gifs/hooks/useCounter';

describe('useCounter', () => {
  it('should initialize counter to 0', () => {
    const { result } = renderHook(() => useCounter());

    expect(result.current.counter).toBe(0);
  });

  it('should increment counter', async () => {
    const { result } = renderHook(() => useCounter(5));

    expect(result.current.counter).toBe(5);

    act(() => {
      result.current.handleAdd();
    });

    expect(result.current.counter).toBe(6);
  });

  it('should decrement counter', () => {
    const { result } = renderHook(() => useCounter(5));

    expect(result.current.counter).toBe(5);

    act(() => {
      result.current.handleSubtract();
    });

    expect(result.current.counter).toBe(4);
  });

  it('should reset counter', () => {
    const { result } = renderHook(() => useCounter(5));

    expect(result.current.counter).toBe(5);

    act(() => {
      result.current.handleAdd();
    });

    expect(result.current.counter).toBe(6);

    act(() => {
      result.current.handleReset();
    });

    expect(result.current.counter).toBe(5);
  });
});
