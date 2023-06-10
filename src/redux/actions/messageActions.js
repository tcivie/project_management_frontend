export const setMessage = (type, content) => ({
  type: 'SET_MESSAGE',
  payload: { type, content },
});

export const clearMessage = () => ({
  type: 'CLEAR_MESSAGE',
});
