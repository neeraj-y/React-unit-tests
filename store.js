import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';
import logger from 'redux-logger';

const configureStore = () => {
    return createStore(
        reducer,
        applyMiddleware(logger)
    )
}

export default configureStore;