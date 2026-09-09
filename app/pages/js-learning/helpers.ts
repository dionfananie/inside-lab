export const formatInput = (value: unknown) =>
  value === undefined ? 'undefined' : JSON.stringify(value);
