export const setFormToCloth = formName => ({
    type: 'SET_FORM_TO_CLOTH',
    payload: formName
});

export const addFormToCloth = formName => ({
    type: 'ADD_FORM_TO_CLOTH',
    payload: formName
});

export const closeFormToCloth = () => ({
    type: 'CLOSE_FORM_TO_CLOTH'
});