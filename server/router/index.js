const router = require("express").Router()
const { getPokemonList, getPokemonDetail, getMyPokemon, catchPokemon, releasePokemon, renamePokemon, savePokemon } = require("../controllers/pokemonController")
const ErrorHandler = require("../middlewares/errorHandler")

router.get("/pokemon", getPokemonList)
router.get("/pokemon/:id", getPokemonDetail)
router.get("/myPokemon", getMyPokemon)
router.post("/pokemon/:id", catchPokemon)
router.post("/catch", savePokemon)
router.delete("/myPokemon/:id", releasePokemon)
router.put("/myPokemon/:id", renamePokemon)

router.use(ErrorHandler)

module.exports = router