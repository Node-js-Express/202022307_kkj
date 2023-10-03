import PokemonData from "../utils/PokemonData.js";
import { asyncWrapper } from "../middleware/async.js";

const pokemonData = new PokemonData();

export const getAllPokemons = asyncWrapper(async(req, res, next) => {
    if (pokemonData.getPokemonData().length === 0) {
        return res.status(404).json({ error: '잡은 포켓몬이 없습니다...' });
    }
    res.status(201).json({ pokemon: pokemonData.getPokemonData() });
});

export const getPokemonToID = asyncWrapper(async(req, res, next) => {
    var pokemon = pokemonData.getPokemonData();
    var id = req.params.id;

    for (var item of pokemon){
        if(item.id==id){
            return res.status(201).json({pokemon:item});
        }
    }

    return res.status(404).json({error:'포켓몬을 찾을 수 없습니다.'})
});

export const getAlpha = asyncWrapper(async(req, res, next) => {
    var pokemon = pokemonData.getPokemonData();
    var names=[]
    pokemon.forEach(item=>{
        if(item.personality=='용감한' || item.personality=='대담한'||item.personality=='무사태평한'){
            if(item.baseStats>=600){
                names.push(item.name);
            }
        }
    })
    if(names.length===0){
        return res.status(404).json({error:'알파가 없는 불쌍한 장원이...'})
    }
    else{
        return res.status(201).json({ names: names })
    }
});

export const deletePokmons = asyncWrapper(async(req, res, next) => {
    var pokemon = pokemonData.getPokemonData();
    var id = req.params.id;
    var name = null;
    pokemon.forEach((element,index)=>{
        if(element.id==id){
            pokemon.splice(index, 1);
            name = element.name;
        }
    })
    if(name!=null){
        pokemonData.setInjectedData(pokemon);
        return res.status(201).json({message: `굿바이 ${name}!!`});
    }
    else{
        return res.status(404).json({error: '포켓몬을 찾을 수 없습니다.'});
    }

});

export const postPokemon = asyncWrapper(async(req, res, next) => {
    var pokemon = pokemonData.getPokemonData();
    var poket = req.body;
    var array = ['대담한', '촐랑거리는', '겁쟁이','조심스러운', '용감한', '무사태평한'];
    for (var item of pokemon){
        if(poket.id==item.id){
            return res.status(400).json({error:'잡았던 포켓몬 입니다.'})
        }
    }
    if(!array.includes(poket.personality)){
        return res.status(400).json({error: '그런 성격을 가진 포켓몬은 없습니다.'});
    }
    if(poket.baseStats<=0 || poket.baseStats>=1000) {
        return res.status(400).json({error: '포켓몬이 너무 강하거나 너무 약합니다.'});
    }
    if(Object.keys(poket).length!=5) {
        return res.status(400).json({error: '포켓몬 데이터가 부족합니다.'});
    }
    pokemon.push(poket);
    pokemonData.setInjectedData(pokemon);
    return res.status(201).json({message:`좋았어 ${poket.name}!! 넌 내꺼야!!!`});
});

export const updatePokemons = asyncWrapper(async (req, res, next) => {
    var pokemon = pokemonData.getPokemonData();
    var id = req.params.id;
    var ids = pokemon.map(row => row.id);
    var poket = req.body;

    for(var i in pokemon){
        if(pokemon[i].id==id){
            ids.splice(i, 1);
            if(ids.includes(poket.id)){
                return res.status(400).json({error: '이미 존재하는 ID입니다.'});
            }
            for(var key in poket){
                pokemon[i][key] = poket[key];
            }
            pokemonData.setInjectedData(pokemon);
            return res.status(201).json({message:`${poket.name}의 포켓몬 정보가 업데이트 되었습니다.`});
        }
    }
    return res.status(404).json({error: '포켓몬을 찾을 수 없습니다.'})

});
