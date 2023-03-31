const { Router } = require('express');
const getGenres = require("../controllers/getGenres");
const getGenresDb = require("../controllers/getGenresDb");


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.get("/", async (req, res) => {
    try {
        const result = await getGenres();
        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
})

router.get("/db", async (req, res) => {
    try {
        const result = await getGenresDb();
        return res.status(200).json(result)
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
})

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
