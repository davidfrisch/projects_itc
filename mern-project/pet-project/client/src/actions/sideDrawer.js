import { TOGLLE_SIDEBAR } from "../constants/actionTypes"

export const toggleSideDrawer = () => async (dispatch) => {
    try {
        dispatch({ type: TOGLLE_SIDEBAR})
    } catch (error) {
        console.log(error)
    }
}