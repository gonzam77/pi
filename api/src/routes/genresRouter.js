const { Router } = require('express');
const getGenres = require("../controllers/getGenres");


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();


router.get("/", (req, res) => {
    try {
        const result = getGenres();
        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
})


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
