const saveGenres = require("./saveGenres");
const axios = require("axios");
const { API_KEY } = process.env;

const getGenres = async () => {
    const response = await axios(`https://api.rawg.io/api/genres?key=${API_KEY}`);
    const data = response.data.results;
    //console.log(data);
    saveGenres(data);
}

module.exports = getGenres;