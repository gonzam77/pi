require("dotenv").config();
const { API_KEY } = process.env;
const axios = require("axios");


const getVideogamesApi = async () => {
    const videogames = [];
    let page = 1;
    console.log("Bucando juegos...");
    while (page < 6) {
        const response = await axios(`https://api.rawg.io/api/games?key=${API_KEY}&page=${page}`)
        const data = response.data.results;
        const videogamesByPage = data.map(game => {
            const genres = game.genres.map(genre => genre.name);
            return ({
                id: game.id,
                name: game.name,
                background_image: game.background_image,                
                genres: genres,
                rating: game.rating,
            })        
        })
        videogamesByPage.forEach(game => {
            videogames.push(game);
        });
        page++;
    }
    console.log(videogames.length);
    return videogames;
}


module.exports = getVideogamesApi;