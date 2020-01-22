import { IAllStates } from './states';

type State = Partial<IAllStates>;

export const updateState = (oldStates: State, updatedValue: State): State => ({
  ...oldStates,
  ...updatedValue
});
