import { IReduxStates } from './reducers/states';
import { useSelector } from 'react-redux';

const useReduxSelector = () => useSelector((s: IReduxStates) => s);

const updateState = <T>(oldStates: T, updatedValue: Partial<T> = {}): T => ({
  ...oldStates,
  ...updatedValue
});

export { useReduxSelector, updateState };
