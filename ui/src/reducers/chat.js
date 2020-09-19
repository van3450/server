const initialState = {
    messages: [],
    opacity: 1,
    isFocus: false
}

export default function chatList(state = initialState, action) {
    const {
        type,
        payload
    } = action;
    const {
        messages,
        opacity
    } = state;
    const CHAT_SIZE = 100;

    switch (type) {
        case 'ADD_MESSAGE_TO_CHAT':
            if (state.messages.length < CHAT_SIZE) {
                return {
                    ...state,
                    messages: [
                        ...messages,
                        payload
                    ]
                }
            } else {
                const newState = {
                    ...state
                }
                newState.messages.splice(0, 1);
                newState.messages.push(payload);
                return newState;
            }
            case 'CHANGE_OPACITY_CHAT':
                return {
                    ...state,
                    opacity: payload
                }
                case 'SHOW_CHAT':
                    return {
                        ...state,
                        isFocus: payload
                    }

                    default:
                        break;
    }

    return state;
}