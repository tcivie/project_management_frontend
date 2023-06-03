// actions/tagActions.js
export const setTags = (tags) => ({
  type: 'SET_TAGS',
  payload: tags,
});

export const setInputVisible = (isVisible) => ({
  type: 'SET_INPUT_VISIBLE',
  payload: isVisible,
});

export const setInputValue = (value) => ({
  type: 'SET_INPUT_VALUE',
  payload: value,
});

export const setEditInputIndex = (index) => ({
  type: 'SET_EDIT_INPUT_INDEX',
  payload: index,
});

export const setEditInputValue = (value) => ({
  type: 'SET_EDIT_INPUT_VALUE',
  payload: value,
});

export const setError = (isError) => ({
  type: 'SET_ERROR',
  payload: isError,
});
