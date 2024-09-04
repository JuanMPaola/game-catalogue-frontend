import axios from "axios";

export const GET_GAMES = "GET_GAMES"
export const GET_BY_ID = "GET_BY_ID"
export const GET_BY_NAME = "GET_BY_NAME"

export const GET_GENRES = "GET_GENRES"
export const GET_PLATFORMS = "GET_PLATFORMS"

export const SUMBIT_GAME = "SUMBIT_GAME"

export const CLEAR_STATE = "CLEAR_STATE"

export const ORDER_UPDOWN = "ORDER_UPDOWN"
export const ORDER_NAMRAT = "ORDER_NAMRAT"
export const FILTER_GENRES = "FILTER_GENRES"
export const FILTER_BY_ORIGIN = "FILTER_BY_ORIGIN"

export function getGames() {
    return async function (dispatch) {
        const response = await axios(`${BAKC_URL}/videogames`)
        return dispatch({
            type: GET_GAMES,
            payload: response.data
        })
    }
}

export function getByName(name) {
    return async function (dispatch) {
        const response = await axios(`${BAKC_URL}/videogames/name?name=${name}`)
        return dispatch({
            type: GET_BY_NAME,
            payload: response.data
        })
    }
}

export function getById(id) {
    return async function (dispatch) {
        const response = await axios(`${BAKC_URL}/videogames/${id}`)
        return dispatch({
            type: GET_BY_ID,
            payload: response.data,
        })
    }
}

export function sumbitGame(data) {
    return async function (dispatch) {
        const response = await axios.post(`${BAKC_URL}/videogames`, data)
        return dispatch({
            type: SUMBIT_GAME,
            payload: [response.data]
        })
    }
}

export function getGenres() {
    return async function (dispatch) {
        const response = await axios(`${BAKC_URL}/genres`)
        return dispatch({
            type: GET_GENRES,
            payload: response.data
        })
    }
}

export function getPlatforms (){
    return async function(dispatch){
        const response = await axios (`${BAKC_URL}/videogames`)
        return dispatch ({
            typeof: GET_PLATFORMS,
            payload: response.data
        })
    }
}

export function orderUpDown(orden) {
    return {
        type: ORDER_UPDOWN,
        payload: orden,
    }
}

export function filterByOrigin(origin) {
    return {
        type: FILTER_BY_ORIGIN,
        payload: origin,
    }
}

export function filterGenres(genre) {
    return ({
        type: FILTER_GENRES,
        payload: genre,
    })
}

export function clearState() {
    return function (dispatch) {
        return dispatch({
            type: CLEAR_STATE,
            payload: []
        })
    }
}

/*
La idea es que al presionar en un checkbox se envie el value, y este se ultilize para filtrar...
Tambien que al desmarcarlo se utilize para desfiltrar...
*/