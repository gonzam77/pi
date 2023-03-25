import {
    GET_ALL_VIDEOGAMES,
    GET_GENRES,
    GET_VIDEOGAME_BY_NAME,
    FILTER_BY_GENRES,
    FILTER_BY_LOCATION,
    ORDER_BY_NAME,
    ORDER_BY_RATING
} from "./actionTypes"

const initialState = {
    videogames: [],
    allVideogames: [],
    genres: []
}

export default function reducer(state = initialState, { type, payload }) {
    switch (type) {
        case GET_ALL_VIDEOGAMES:
            return {
                ...state,
                videogames: payload,
                allVideogames: payload
            }
        case GET_GENRES:
            return {
                ...state,
                genres: payload
            }
        case GET_VIDEOGAME_BY_NAME:
            return {
                ...state,
                videogames: payload,
            }
        case ORDER_BY_NAME:
            if (payload === "Ascendente") {
                return {
                    ...state,
                    videogames: state.videogames.sort((x, y) => x.name.localeCompare(y.name))
                }
            }
            if (payload === "Descendente") {
                return {
                    ...state,
                    videogames: state.videogames.sort((x, y) => y.name.localeCompare(x.name))
                }
            }
            return { ...state }
        case ORDER_BY_RATING:
            if (payload === "Ascendente") {
                return {
                    ...state,
                    videogames: state.videogames.sort((x, y) => x.rating - y.rating)
                    // browsers.sort((x, y) => x.year - y.year);
                }
            }
            if (payload === "Descendente") {
                return {
                    ...state,
                    videogames: state.videogames.sort((x, y) => y.rating - x.rating)
                }
            }
            return { ...state }
        case FILTER_BY_GENRES:
            if (payload === "all") {
                return {
                    ...state,
                    videogames: state.allVideogames
                }
            }
            return {
                ...state,
                videogames: state.allVideogames.filter(videogame => {
                    if (videogame.genres.includes(payload)) return videogame
                    return null
                })
            }
        case FILTER_BY_LOCATION:
            if(payload === "all") {
                return {
                    ...state,
                    videogames: state.allVideogames
                }
            }
            if(payload === "database"){
                return {
                    ...state,
                    videogames: state.allVideogames.filter(videogame => videogame.createInDb)
                }
            } else {
                return {
                    ...state,
                    videogames: state.allVideogames.filter(videogame => !videogame.createInDb)
                }
            }
        default:
            return { ...state }
    }
}