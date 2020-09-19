const initialState = [
]
    
  export default function userList(state = initialState, action) {
      if(action.type === 'ADD_ITEMS_TO_CLOTHES') {
        return [
          ...state,
          action.payload
        ];
      }
      if(action.type === 'REMOVE_ITEMS_TO_CLOTHES'){
        let popped = state.pop();
          return state;
      }
      return state;
    }