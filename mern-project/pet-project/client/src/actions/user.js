import * as api from '../api/index.js'
import { FETCH_USERS, UPDATE_CURRENT_USER, UPDATE_USER } from '../constants/actionTypes.js'


export const getUsers = () => async (dispatch) => {
    try {
        const { data } = await api.getUsers()
        dispatch({ type: FETCH_USERS, payload: data })
    } catch (error) {
        console.log(error.response.message)
    }
}

export const getUserById = (idUser) => async (dispatch) => {
    try {
        const { data } = await api.getUserById(idUser)
        dispatch({ type: UPDATE_USER, payload: data })
    } catch (error) {
        console.log(error.response.message)
    }
}

export const updateCurrentUserById = (idUser, user) => async (dispatch) => {
    try {
        // upload picture, 
        // put the link picture in update current user with imagekit 

        const { data } = await api.updateUserById(idUser, user)
        dispatch({ type: UPDATE_CURRENT_USER, payload: data })
    } catch (error) {
        console.log(error.response.message)
    }
}

export const updateUserByIdAdmin = (idUser, user) => async (dispatch) => {
    try {
        const { data } = await api.updateUserByIdAdmin(idUser, user)
        dispatch({ type: UPDATE_USER, payload: data })
    } catch (error) {
        console.log(error.response.message)
    }
}



export const getUserFullById = (idUser) => async (dispatch) => {
    try {
        const { data } = await api.getUserFullById(idUser)
        dispatch({ type: UPDATE_USER, payload: data })
    } catch (error) {
        console.log(error)
    }
}

