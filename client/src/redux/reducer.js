import {
    GET_ALL_VIDEOGAMES,
    GET_GENRES,
    GET_VIDEOGAME_BY_NAME,
} from "./actionTypes"

const initialState = {
    videogames: [],
    allVideogames: [],
    genres: []
}

export default function reducer(state = initialState, { type, payload }) {
    switch (type) {
        case GET_ALL_VIDEOGAMES:
            //console.log("payload ->", payload);
            return {
                ...state,
                videogames: [...state.allVideogames, payload],
                allVideogames: [...state.allVideogames, payload]
            }
        case GET_GENRES:
            return {
                ...state,
                genres: [...state.genres, payload]
            }
        case GET_VIDEOGAME_BY_NAME:
            return {
                ...state,
                videogames: [payload]
            }

        default:
            return { ...state }
    }
}