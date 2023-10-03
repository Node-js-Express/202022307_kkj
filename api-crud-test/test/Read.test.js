import { getAllPokemons, getPokemonToID, getAlpha } from '../controllers/tasks.js'
import { generateRandomPokemonSet } from '../utils/testDataGenerater.js';
import PokemonData from '../utils/PokemonData.js';

const pokemonDataInstance = new PokemonData();

describe('Read 테스트', () => {
  beforeEach(() => {
    // 각 테스트가 실행되기 전에 초기 상태를 복사하여 저장
    generateRandomPokemonSet(50);
  });

  test('모든 포켓몬 가져오기', async () => {
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getAllPokemons(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ pokemon: pokemonDataInstance.getPokemonData() });
  });

  test('특정 ID의 포켓몬 가져오기', async () => {
    const req = {
      params: { id: 1 },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getPokemonToID(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ pokemon: pokemonDataInstance.getPokemonData()[0] });
  });

  test('찾을 수 없는 포켓몬 ID로 요청 시 404 반환', async () => {
    const req = {
        params: { id: 999 },  // 존재하지 않는 ID를 사용
    };
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    };

    await getPokemonToID(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: '포켓몬을 찾을 수 없습니다.' });
  });

  test('알파 포켓몬 가져오기', async () => {
    const alphaDataSet = pokemonDataInstance.getPokemonData().filter(p => p.baseStats >= 600 && ['대담한', '용감한', '무사태평한'].includes(p.personality));

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getAlpha(req, res);

    const expectedNames = alphaDataSet.map(p => p.name);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ names: expect.arrayContaining(expectedNames) });
   });

  test('알파 포켓몬이 없는 경우 404 반환', async () => {

    pokemonDataInstance.getPokemonData().splice(0, pokemonDataInstance.getPokemonData().length);

    const req = {};
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    };

    await getAlpha(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: '알파가 없는 불쌍한 장원이...' });
  });
});