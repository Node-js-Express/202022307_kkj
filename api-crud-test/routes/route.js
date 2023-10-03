import express from 'express'
import {
    deletePokmons,
    getAllPokemons,
    getAlpha,
    getPokemonToID,
    postPokemon,
    updatePokemons
} from '../controllers/tasks.js'

export const router = express.Router();
router.route('/').post(postPokemon)

router.route('/').get(getAllPokemons)
router.route(`/:id([0-9]+)`).get(getPokemonToID)
router.route('/alpha').get(getAlpha)

router.route('/:id').post(updatePokemons)

router.route('/:id').delete(deletePokmons)

/**
 1. Create (포켓몬 추가):
 - POST  `/api/pokemons`
 2. Read (포켓몬 조회):
 - 전체 조회: GET  `/api/pokemons`
 - ID로 조회: GET  `/api/pokemons/:id`
 - 알파 조회: GET  `/api/pokemons/alpa`
 3. Update (포켓몬 이름 변경 및 타이틀 업데이트):
 - 이름 변경: POST, PUT  `/api/pokemons/:id`
 4. Delete (포켓몬 삭제):
 - DELETE  `/api/pokemons/:id`
 */


