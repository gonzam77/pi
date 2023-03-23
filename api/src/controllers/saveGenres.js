const { Genres } = require("../db");

const saveGenres = async (data) => {
    const genres = await data.map(genre => {
        Genres.findOrCreate({
            where: { 
            name: genre.name,
            id: genre.id
            }
        })
    })
    return genres;
}


module.exports = saveGenres;