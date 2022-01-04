import { useState, useEffect, useReducer } from 'react'
import * as api from '../../../api'

let initialState = {
    data: null,
    isPending: false,
    error: null,
    success: null,
}

const statisticsReducer = (state, action) => {
    switch (action.type) {
        case "IS_PENDING":
            return { success: false, isPending: true, error: null, data: null }
        case "ERROR":
            return { success: false, isPending: false, error: action.payload, data: null }
        case "ADDED_DATA":
            return { success: true, isPending: false, error: null, data: action.payload }
        default:
            return state
    }
}


export const useStatistics = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [response, dispatch] = useReducer(statisticsReducer, initialState)


    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])


    // only dispatch if not cancelled
    const dispatchIfNotCancelled = (action) => {
        if (!isCancelled) {
            dispatch(action)
        }
    }

    const getStatistics = async () => {
        dispatch({ type: "IS_PENDING" })

        try {
            const { data } = await api.getStatistics()
            dispatchIfNotCancelled({ type: "ADDED_DATA", payload: data })
        }
        catch (err) {
            dispatchIfNotCancelled({ type: "ERROR", payload: err.message })
        }

    }

    return { getStatistics, response, isPending, error }
}