import { combineReducers } from 'redux';

import { petsReducer } from './petsReducer';
import { sideDrawerReducer } from './sideDrawerReducer'
import { authReducer } from './authReducer'
import { userReducer } from './userReducer'

export const reducers = combineReducers({
    pets: petsReducer,
    userStatus: authReducer,
    users: userReducer,
    isSideDrawerOpen: sideDrawerReducer
});