import { useState } from 'react';

export const useCounter = (initialValue = 0) => {
  const [counter, setCounter] = useState<number>(initialValue);

  const handleAdd = () => setCounter((c) => c + 1);

  const handleSubtract = () => setCounter((c) => c - 1);

  const handleReset = () => setCounter(initialValue);

  return {
    counter,

    handleAdd,
    handleSubtract,
    handleReset,
  };
};
