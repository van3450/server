const initialState = [
]
    
  export default function selectItems(state = initialState, action) {
      if(action.type === 'ADD_ITEMS_SELECT') {
        return [
          action.payload
        ];
      }
      return state;
    }