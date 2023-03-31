require("dotenv").config();
const { API_KEY } = process.env;
const axios = require("axios");
const { Videogame, Genre, Op } = require("../db")


const getVideogameByName = async (name) => {
    console.log("Searching in DATABASE...");
    const videogamesDB = await Videogame.findAll({
        where: {
            name: {
                [Op.iLike]: `${name}`,
            },
        },
    }, {
        include: {
            model: Genre,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }
    });

    //console.log("Searching in API...");

    try {
        const response = await axios(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`);
        const videogamesApi = [];
        for (let i = 0; i < 15; i++) {
            const data = response.data.results[i];
            const platforms = data.platforms.map(obj => obj.platform.name);
            const genres = data.genres.map(obj => obj.name);
            const videogame = {
                
                id: data.id,
                name: data.name,
                background_image: data.background_image ? data.background_image : "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg",
                platforms: platforms,
                description: data.description ? data.description : "No description",
                released: data.released,
                genres: genres
            }
            videogamesApi.push(videogame);
        }
        if (videogamesDB.length && videogamesApi.length) {
            const allGames = videogamesDB.concat(videogamesApi).slice(0, 15);
            return allGames;
        }
        if (videogamesDB.length) return videogamesDB;
        if (videogamesApi.length) return videogamesApi;

    } catch (error) {
        return error.message
    }
}

module.exports = getVideogameByName;