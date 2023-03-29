const { Genres, Videogame } = require("../db")

const getVideogameByIdDb = async (id) => {
    let response = await Videogame.findByPk(id, {
                include: {
                    model: Genres,
                    attributes: ['name'],
                    through: {
                        attributes: [],
                    },
                }
            });
    
            const genres = response.Genres.map(genre => genre.name);
            console.log(genres);
            return {
                id: response.id,
                name: response.name,
                description: response.description,
                image: response.image,
                released: response.released,
                platforms: response.platforms,
                rating: response.rating,
                genres: genres
            }
    
}


module.exports = getVideogameByIdDb;