import React from 'react';

const initialState = [
]
  
export default function formList(state = initialState, action) {
    if(action.type === 'ADD_FORM_TO_CLOTH') {
      return [
        ...state,
        action.payload
      ];
    }
    if(action.type === 'SET_FORM_TO_CLOTH') {
      return [
        action.payload
      ];
    }
    if(action.type === 'CLOSE_FORM_TO_CLOTH'){
      return [];
    }
    return state;
  }