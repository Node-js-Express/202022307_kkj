import { setInjectedData } from "./PokemonData";
import PokemonData from "./PokemonData";

const pokemonDataInstance = new PokemonData();

const generateRandomPersonality = () => {
    const personalities = ['대담한', '촐랑거리는', '겁쟁이', '조심스러운', '용감한', '무사태평한'];
    const randomIndex = Math.floor(Math.random() * personalities.length);
    return personalities[randomIndex];
  };
  
const generateRandomBaseStats = () => Math.floor(Math.random() * 1000);
  
export const generateRandomPokemonSet = (count) => {
    const pokemonSet = [];
    for (let i = 1; i <= count; i++) {
        const pokemon = {
        id: i,
        name: `포켓몬${i}`,
        gender: i % 2 === 0 ? '남' : '여',
        baseStats: generateRandomBaseStats(),
        personality: generateRandomPersonality(),
        };
        pokemonSet.push(pokemon);
    }
    pokemonDataInstance.setInjectedData(pokemonSet);
};