const { Videogame, Genres} = require("../db");

const getVideogamesDb = async () => {
    const videogames = await Videogame.findAll( {
        include: {
            model: Genres,
            attributes: ['name'],
            through: {
                attributes:[],
            },
        }
    });
    return videogames;
}

module.exports = getVideogamesDb;