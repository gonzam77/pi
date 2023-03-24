const { Genres } = require("../db");

const getGenresDb = async () => {
    const response = await Genres.findAll({
        attributes: ['name']
    })

    const data = await response.map(resp => resp.toJSON())
    const genres = await data.map(obj => obj.name)

    return genres;
}
module.exports = getGenresDb;