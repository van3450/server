const initialState = []
  
export default function formList(state = initialState, action) {
    switch(action.type){
        case 'ADD_NOTIFICATION':
            let h = true;
            for(let i = 0; i < state.length; i++){
                if(state[i].props.typeNot == action.payload.typeNot){
                    h = false;
                    return [...state];
                }
            }
            if(h){
                return[...state, action.payload.form]
            }
        case 'CLOSE_NOTIFICATION':
            for(let i = 0; i < state.length; i++){
                if(state[i].props.typeNot == action.payload){
                    const newState = [...state];
                    newState.splice(i, 1);
                    return newState;
                }    
            }
    }
    return state;
  }