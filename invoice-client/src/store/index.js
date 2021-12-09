import reduxThunk from 'redux-thunk';
import {createStore,applyMiddleware,compose} from 'redux';
import allReducers from '../reducers/index';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__|| compose;
const store = createStore(
    allReducers,
    composeEnhancers(applyMiddleware(reduxThunk)));

export default store;