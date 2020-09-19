import React from 'react';
import LogPage from '../components/LogPage.jsx';

export const setForm = formName => ({
    type: 'SET_FORM',
    payload: formName
});

export const addForm = formName => ({
    type: 'ADD_FORM',
    payload: formName
});

export const closeForm = () => ({
    type: 'CLOSE_FORM'
});

export const closeMessage = (arr) => ({
    type: 'CLOSE_MESSAGE',
    payload: arr
});

export const getLog = () => dispatch => {
    setTimeout(() => {
        dispatch({
            type: 'SET_FORM', 
            payload: <LogPage />
        })
    }, 5000);
};