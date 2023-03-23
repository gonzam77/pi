const { Router } = require('express');
const genresRouter = require("./genresRouter")
const videogameRouter  = require("./videogamesRouter")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
router.use("/videogames", videogameRouter);
router.use("/genres", genresRouter);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
