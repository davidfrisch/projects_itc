import { AUTH, END_LOADING_AUTH, LOGOUT, START_LOADING_AUTH } from '../constants/actionTypes';

export const authReducer = (state = { currentUserAuth: null, isLoading: true }, action) => {
    switch (action.type) {
        case START_LOADING_AUTH:
            return { ...state, isLoading: true }
        case END_LOADING_AUTH:
            return { ...state, isLoading: false }
        case AUTH:
            return { ...state, currentUserAuth: action.payload }
        case LOGOUT:
            return { ...state, currentUserAuth: null }
        default:
            return state
    }
}