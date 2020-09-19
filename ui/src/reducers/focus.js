const initialState = [0]
  
export default function formList(state = initialState, action) {
    if(action.type === 'CHANGE_FOCUS') {
      return [
        action.payload
      ];
    }
    return state;
  }