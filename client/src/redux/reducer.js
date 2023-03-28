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
    const fixedBugs = { prueba: 1 }
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

        // browsers.sort((x, y) => x.name.localeCompare(y.name));
            if (payload === "Ascendente") {
                const videogamesOrdered = state.allVideogames.sort((a, b) => a.name.localeCompare(b.name));
                return {
                    ...state,
                    videogames: videogamesOrdered.concat(fixedBugs)
                }

            }
            if (payload === "Descendente") {
                const videogamesOrdered = state.allVideogames.sort((a, b) => b.name.localeCompare(a.name));
                return {
                    ...state,
                    videogames: videogamesOrdered.concat(fixedBugs)
                }

            }
            return { ...state }
        case ORDER_BY_RATING:
            if (payload === "Ascendente") {
                const videogamesOrdered = state.videogames.sort((a, b) => a.rating - b.rating);
                return {
                    ...state,
                    videogames: videogamesOrdered.concat(fixedBugs)
                }

            }
            if (payload === "Descendente") {
                const videogamesOrdered = state.videogames.sort((a, b) => b.rating - a.rating);
                return {
                    ...state,
                    videogames: videogamesOrdered.concat(fixedBugs)
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
            if (payload === "all") {
                return {
                    ...state,
                    videogames: state.allVideogames
                }
            }
            if (payload === "database") {
                return {
                    ...state,
                    videogames: state.allVideogames.filter(videogame => videogame.createdInDb)
                }
            } else {
                return {
                    ...state,
                    videogames: state.allVideogames.filter(videogame => !videogame.createdInDb)
                }
            }
        default:
            return { ...state }
    }
}