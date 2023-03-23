import {
    GET_GENRES,
    GET_ALL_VIDEOGAMES,
    GET_VIDEOGAME_BY_ID,
    GET_VIDEOGAME_BY_NAME,
    CREATE_VIDEOGAME
}
    from "./actionTypes";
import axios from "axios";

export const getGenres = () => {
    return async function (dispatch) {
        const response = await axios('http://localhost:3001/genres');
        const data = response.data;
        return dispatch({
            type: GET_GENRES,
            payload: data
        })
    }
}

export const getAllVideogames = () => {
    return async function (dispatch) {
        console.log("buscando")
        const response = await axios("http://localhost:3001/videogames");
        const data = response.data;
        return dispatch({
            type: GET_ALL_VIDEOGAMES,
            payload: data,
        })
    }
}

export const getVideogameByName = (name) => {
    return async function (dispatch) {
        const response = await axios(`http://localhost:3001/videogames/name?search=${name}`);
        const data = response.data;
        return dispatch({
            type: GET_VIDEOGAME_BY_NAME,
            payload: data,
        })
    }
}