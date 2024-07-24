const { default: axios } = require("axios");
const {MyPokemon} = require("../models")
const getPokemonList = async (req, res, next) => {
    try {
        const {data: pokemons} = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=10000`)
        const resp = await pokemons.results.map((el) => {
            const id = el.url.split("/")[6]
            return {...el, id, thumbnail: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
        })
        res.status(200).json(resp)
    } catch (error) {
        next(error)
    }
}

const getPokemonDetail = async (req, res, next) => {
    try {
        const {id} = req.params
        const {data: pokemon} = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        res.status(200).json(pokemon)
    } catch (error) {
        next(error)
    }
}

const getMyPokemon = async (req, res, next) => {
    try {
        const myPokemons = await MyPokemon.findAll();
        const resp = await myPokemons.map((el) => {
            return {...el.dataValues, thumbnail: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${el.pokemonId}.png`}
        })
        res.status(200).json(resp)
    } catch (error) {
        next(error)
    }
}

const catchPokemon = async (req, res, next) => {
    try {
        const isSuccess = Math.floor(Math.random() * 2)
        if (isSuccess) {
            res.status(200).json({status: "success"})
        } 
        res.status(201).json({status: "fail"})
    } catch (error) {
        next(error)
    }
}

const savePokemon = async (req, res, next) => {
    try {
        const {pokemonId, nickname} = req.body;
        await MyPokemon.create({
            pokemonId,
            nickname,
            renameFlag: 0
        })
        res.status(201).json(`Succesfully Catch ${nickname}`)
    } catch (error) {
        next(error)
    }
}

const releasePokemon = async (req, res, next) => {
    try {
        // check pokemon e ada gak lek g ad throw
        const {id} = req.params
        const pokemon = await MyPokemon.findByPk(id)
        if (!pokemon.id) {
            throw { name: "pokemonNotFound"}
        }
        const number = Math.floor(Math.random() * 100)
        let isPrime = true;
        if (number === 1) {
            isPrime = false
        } else if (number > 1) {
            for (let i = 2; i < number; i++) {
                if (number % i == 0) {
                    isPrime = false;
                    break;
                }
            }
        } else {
            isPrime = false
        }
        if (isPrime) {
            await MyPokemon.destroy({where: {
                id
            }})
            res.status(200).json({number: number})
        } else {
            res.status(200).json({number: number})
        }
    } catch (error) {
        next(error)
    }
}

const renamePokemon = async (req, res, next) => {
    try {
        // check pokemon e ada gak lek g ad throw
        const {id} = req.params
        const {nickname} = req.body
        const pokemon = await MyPokemon.findByPk(id)
        if (!pokemon.id) {
            throw { name: "pokemonNotFound"}
        }
        let data = {}
        if (pokemon.renameFlag === 0) {
            data = {
                nickname: `${nickname}-${0}`,
                renameFlag: 1
            }
        } else {
            const oldNumber = Number(pokemon.nickname.split("-")[pokemon.nickname.split("-").length-1])
            data = {
                nickname: `${nickname}-${pokemon.renameFlag}`,
                renameFlag: pokemon.renameFlag+oldNumber
            }
        }
        await MyPokemon.update(data, {
            where: {
                id: pokemon.id
            }
        })
        res.status(201).json(`succes rename pokemon to ${data.nickname}`)
    } catch (error) {
        
    }
}

module.exports = {
    getPokemonList,
    getPokemonDetail,
    getMyPokemon,
    catchPokemon,
    savePokemon,
    releasePokemon,
    renamePokemon,
}