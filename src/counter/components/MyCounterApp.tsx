import { useCounter } from '../../gifs/hooks/useCounter';

export const MyCounterApp = () => {
  const { counter, handleAdd, handleSubtract, handleReset } = useCounter(5);

  return (
    <div>
      <h1>Counter: {counter}</h1>

      <div>
        <button onClick={handleAdd}>+1</button>
        <button onClick={handleSubtract}>-1</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};
