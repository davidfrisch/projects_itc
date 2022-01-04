import { TOGLLE_SIDEBAR } from "../constants/actionTypes";

//update the store of redux
export const sideDrawerReducer = (state = false, action) => {
    switch (action.type) {
        case TOGLLE_SIDEBAR:
            return !state
        default:
            return state;
    }
}