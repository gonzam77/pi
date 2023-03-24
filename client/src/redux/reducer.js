import { orderByRating } from "./actions"
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
                videogames: [...state.allVideogames, payload],
                allVideogames: [...state.allVideogames, payload]
            }
        case GET_GENRES:
            return {
                ...state,
                genres: payload
            }
        case GET_VIDEOGAME_BY_NAME:
            return {
                ...state,
                videogames: [payload]
            }
        case ORDER_BY_NAME:
            return {
                ...state,
                videogames: state.videogames.sort((x, y) => x.name.localeCompare(y.name))
            }
        // browsers.sort((x, y) => x.name.localeCompare(y.name))
        case ORDER_BY_RATING:
            return {
                ...state,
                videogames: state.videogames.sort((x, y) => x.rating - y.rating)
                // browsers.sort((x, y) => x.year - y.year);
            }
        case FILTER_BY_GENRES:
            return {
                ...state,
                videogames: state.allVideogames.filter(videogame => {
                    const result = videogame.genres.map(genre => genre === payload)
                    if(result.length) return videogame;
                    else return null;
                })
            }
        case FILTER_BY_LOCATION:
            return {
                ...state,
                videogames: [payload]
            }       

        default:
            return { ...state }
    }
}