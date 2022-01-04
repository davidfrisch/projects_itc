import * as api from '../api/index.js'
import { CREATE_PET, FETCH_PETS, FETCH_PET, FETCH_QUERY, FETCH_USER_PETS, UPDATE_PET, UPDATE_CURRENT_USER, START_LOADING_PET, END_LOADING_PET } from '../constants/actionTypes.js'


export const getPets = () => async (dispatch) => {
    try {
        const { data } = await api.getPets()
        dispatch({ type: FETCH_PETS, payload: data })
    } catch (error) {
        console.log(error)
    }
}

export const getPetsWithForm = (query) => async (dispatch) => {
    try {
        const { data: filterPets } = await api.getPets('?' + query)
        dispatch({ type: FETCH_QUERY, payload: filterPets })
    } catch (error) {
        console.log(error)

    }
}

export const addPet = (pet) => async (dispatch) => {
    try {
        const { data } = await api.addPet(pet)
        dispatch({ type: CREATE_PET, payload: data })
    } catch (error) {
        console.log(error.message)
    }
}

export const editPet = (editPet) => async (dispatch) => {
    try {
        const { data } = await api.editPet(editPet._id, editPet)
        dispatch({ type: UPDATE_PET, payload: data })
    } catch (error) {
        console.log(error)
    }
}

export const getPet = (idPet) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING_PET })
        const { data } = await api.getPet(idPet)
        dispatch({ type: FETCH_PET, payload: data })
    } catch (error) {
        console.log(error)
        dispatch({ type: FETCH_PET, payload: null })
    }
    dispatch({ type: END_LOADING_PET })

}


export const getPetsByUserId = (idUser) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING_PET })
        const { data } = await api.getPetsByUserId(idUser)
        dispatch({ type: FETCH_USER_PETS, payload: data })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: END_LOADING_PET })

}


//TODO when user setup
export const adoptPet = (idPet, newAdoptionStatus) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING_PET })
        const { data } = await api.adoptPet(idPet, { newAdoptionStatus })
        dispatch({ type: UPDATE_CURRENT_USER, payload: data })
    } catch (error) {
        console.log(error)
    }

    dispatch({ type: END_LOADING_PET })
}
export const returnPet = (idPet) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING_PET })
        const { data } = await api.returnPet(idPet)
        dispatch({ type: UPDATE_CURRENT_USER, payload: data })
    } catch (error) {
        console.log(error)
    }
    dispatch({ type: END_LOADING_PET })
}

export const savePet = (idPet) => async (dispatch) => {
    const { data } = await api.savePet(idPet)
    dispatch({ type: UPDATE_CURRENT_USER, payload: data })
}

export const deletePet = (idPet) => async (dispatch) => {
    const { data } = await api.deletePet(idPet)
    dispatch({ type: UPDATE_CURRENT_USER, payload: data })
}