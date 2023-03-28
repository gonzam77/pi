const { Router } = require('express');
const getVideogameByName = require("../controllers/getVideogamesByName");
const getVideogameById = require("../controllers/getVideogamesById");
const createVideogame = require("../controllers/createVideogame");
const getVideogamesApi = require("../controllers/getVideogamesApi");
const getVideogamesDb = require("../controllers/getVideogamesDb");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.get("/", async (req, res) => {
    try {
        const videogamesApi = await getVideogamesApi();
        const videogamesDb = await getVideogamesDb();
        if(videogamesDb.length) {
            const allVideogames = videogamesDb.concat(videogamesApi);
            return res.status(200).json(allVideogames);
        }
        return res.status(200).json(videogamesApi);
    } catch (error) {
        return res.status(400).json({error: error.message});
    }
})

router.get("/name", async (req, res) => {
    const { search } = req.query;
    try {
        const result = await getVideogameByName(search);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
})

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const result = await getVideogameById(Number(id));
        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
})


router.post("/", async (req, res) => {
    try {
        const result = await createVideogame(req.body);
        return res.status(201).json(result);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
})


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
