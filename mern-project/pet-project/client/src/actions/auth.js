import * as api from '../api/index.js'
import { AUTH, END_LOADING_AUTH, LOGOUT, START_LOADING_AUTH, UPDATE_CURRENT_USER } from '../constants/actionTypes'

export const login = () => async (dispatch) => {
    dispatch({ type: START_LOADING_AUTH })
    try {
        const { data } = await api.login()
        const { result } = data
        dispatch({ type: AUTH, payload: result })
        dispatch({ type: UPDATE_CURRENT_USER, payload: result })
    } catch (error) {
        console.log(error)
    }

    dispatch({ type: END_LOADING_AUTH })
}

export const signUp = (formData, setOpenModal, setNewErrors) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING_AUTH })
        const { data } = await api.signUp(formData)
        dispatch({ type: AUTH, payload: data.result })
        dispatch({ type: UPDATE_CURRENT_USER, payload: data.result })
        setOpenModal(false)

    } catch (error) {
        console.log(error.response)
        setNewErrors(error.response.data)
    }
    dispatch({ type: END_LOADING_AUTH })
}

export const signIn = (formData, setOpenModal, setNewErrors) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING_AUTH })
        const { data } = await api.signIn(formData)
        dispatch({ type: AUTH, payload: data.result })
        setOpenModal(false)
    } catch (error) {
        console.log(error.response)
        if (!error.response?.data) return
        setNewErrors(error.response.data)
    }
    dispatch({ type: END_LOADING_AUTH })

}

export const signInWithGoogle = (resGoogle, setOpenModal) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING_AUTH })
        const { data } = await api.signInWithGoogle(resGoogle)
        dispatch({ type: AUTH, payload: data.result })
        setOpenModal(false)
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: END_LOADING_AUTH })
}

export const logOut = (setOpenModal, navigate) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING_AUTH })
        const res = await api.logOut()
        if (res.status === 200) {
            dispatch({ type: START_LOADING_AUTH })
            console.log('successfuly logout')
            setOpenModal(false)
            navigate('/')
            dispatch({ type: UPDATE_CURRENT_USER, payload: null })
            dispatch({ type: LOGOUT })
        }

    } catch (error) {
        console.log(error)
    }

    dispatch({ type: END_LOADING_AUTH })

}