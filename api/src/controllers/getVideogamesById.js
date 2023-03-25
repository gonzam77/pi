const { API_KEY } = process.env;
const { Videogame, Genres } = require("../db")
const axios = require("axios");


const getVideogameById = async (id) => {
    if (typeof id !== "number") {
        //console.log(id);
        let response = await Videogame.findByPk(id, {
            include: {
                model: Genres,
                attributes: ['name'],
                through: {
                    attributes: [],
                },
            }
        });
        if (response) return response;
        //console.log(videogames);
    }
    else {
        let response = await axios(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
        const data = response.data
        //console.log(data);
        const platforms = data.platforms.map(obj => obj.platform.name);
        const genres = data.genres.map(genre => genre.name);
        //console.log(genres);
        //console.log(platforms);
        const videogame = {
            id: data.id,
            name: data.name,
            description: data.description ? data.description : "No description",
            image: data.background_image ? data.background_image : "Image not found",
            released: data.released,
            platforms: platforms,
            rating: data.rating,
            genres: genres
        }
        //console.log(data);
        return videogame;
    }
}
module.exports = getVideogameById;