export const updateState = <T>(
  oldStates: T,
  updatedValue: Partial<T> = {}
): T => ({
  ...oldStates,
  ...updatedValue
});
