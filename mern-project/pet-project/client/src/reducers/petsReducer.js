import { CREATE_PET, UPDATE_PET,  FETCH_PETS, UPDATE_PETS, DELETE, START_LOADING_PET, END_LOADING_PET, FETCH_PET, FETCH_QUERY, FETCH_USER_PETS } from "../constants/actionTypes";

//update the store of redux
export const petsReducer = (state = { isLoadingPet: true, pets: [], petsQuery: [], userPets: null, pet: null }, action) => {
    switch (action.type) {
        case START_LOADING_PET:
            return { ...state, isLoadingPet: true }
        case END_LOADING_PET:
            return { ...state, isLoadingPet: false }
        case FETCH_PETS:
            return { ...state, pets: action.payload }
        case FETCH_PET:
        case UPDATE_PET:
            return { ...state, pet: action.payload }
        case FETCH_USER_PETS:
            return { ...state, userPets: action.payload }
        case FETCH_QUERY:
            return { ...state, petsQuery: action.payload }
        case CREATE_PET:
            return { ...state, pets: [...state.pets, action.payload] }
        case UPDATE_PETS:
            return {
                ...state,
                pets: state.pets.map((pet) => {
                    if (pet._id === action.payload._id) {
                        return action.payload
                    }
                    return pet
                })
            }
        case DELETE:
            return { ...state, pets: state.pets.filter(((pet) => pet._id !== action.payload)) }
        default:
            return state;
    }
}