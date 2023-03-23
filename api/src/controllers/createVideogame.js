const { Videogame, Genres } = require("../db")

const createVideogame = async (body) => {
  const { id, name, description, platforms, image, released, rating, genres } = body;

  const exist = await Videogame.findByPk(id)

  if(exist) throw new Error("Game already exist.");

  const videogame = await Videogame.create({
    id,
    name,
    description,
    platforms,
    image,
    released,
    rating,
  });

  for(let i = 0; i < genres.length; i++) {
    const genre = await Genres.findOne({ where: { name: genres[i]}})
    videogame.addGenres(genre);
  } 
  
  console.log("Videogame created successfully");
  
  return videogame;
}

module.exports = createVideogame;