import { combineReducers, Store, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { composeWithDevTools } from 'redux-devtools-extension';
import { actionFromClassMiddleware } from '../middleware/actionFromClass';

import { StoreFrontAppState } from '../states/StoreFrontAppState';
import { screenObjectsReducer } from '../reducers/screenObjects.reducer';

export const storeFrontAppStore: Store<StoreFrontAppState> = createStore(
    combineReducers({
        screenObjects: screenObjectsReducer
    }),
    composeWithDevTools(applyMiddleware(thunk, actionFromClassMiddleware))
)