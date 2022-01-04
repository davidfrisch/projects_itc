import { END_LOADING_USER, FETCH_USERS, START_LOADING_USER, UPDATE_USERS, UPDATE_USER, UPDATE_CURRENT_USER } from '../constants/actionTypes';

export const userReducer = (state = { currentUser: null, user: null, users: null, isLoading: true }, action) => {
    switch (action.type) {
        case FETCH_USERS:
            return { ...state, users: action.payload }
        case START_LOADING_USER:
            return { ...state, isLoading: true }
        case END_LOADING_USER:
            return { ...state, isLoading: false }
        case UPDATE_USERS:
            return { ...state, users: action.payload }
        case UPDATE_USER:
            return { ...state, user: action.payload }
        case UPDATE_CURRENT_USER:
            return { ...state, currentUser: action.payload }
        default:
            return state
    }
}