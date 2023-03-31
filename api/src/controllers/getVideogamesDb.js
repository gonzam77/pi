const { Videogame, Genres } = require("../db");

const getVideogamesDb = async () => {
    const response = await Videogame.findAll({
        include: {
            model: Genres,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }
    });

    const data = await response.map(resp => resp.toJSON())
    const videogames = data.map(game => {
        const genres = game.Genres.map(genre => genre.name)
        return {
            id: game.id,
            createdInDb: game.createdInDb,
            name: game.name,
            description: game.description,
            background_image: game.image,
            platforms: game.platforms,
            genres: genres,
            rating: game.rating,
        }
    })
    
    return videogames;
}

module.exports = getVideogamesDb;