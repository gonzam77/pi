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
        return {
            id: game.id,
            name: game.name,
            description: game.description,
            background_image: game.image,
            platforms: game.platforms,
            genres: [game.Genres[0].name],
            rating: game.rating,
        }
    })
    
    return videogames;
}

module.exports = getVideogamesDb;