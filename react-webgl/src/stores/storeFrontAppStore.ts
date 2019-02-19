import { combineReducers, Store, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { composeWithDevTools } from 'redux-devtools-extension';
import { actionFromClassMiddleware } from '../middleware/actionFromClass';

import { StoreFrontAppState } from '../states/StoreFrontAppState';

export const storeFrontAppStore: Store<StoreFrontAppState> = createStore(
    combineReducers({

    }),
    composeWithDevTools(applyMiddleware(thunk, actionFromClassMiddleware))
)