import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducers from './reducers';
import { PlayerEvents } from './events/playerEvents';

const store = createStore(rootReducers, 
    composeWithDevTools(applyMiddleware(thunk)));

PlayerEvents(store.dispatch, store.getState);

export default store;

