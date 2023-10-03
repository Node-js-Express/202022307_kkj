import { deletePokmons } from '../controllers/tasks.js'
import { generateRandomPokemonSet } from '../utils/testDataGenerater.js';
import PokemonData from '../utils/PokemonData.js';

const pokemonDataInstance = new PokemonData();

describe('Delete 테스트', () => {
  beforeEach(() => {
    // 각 테스트가 실행되기 전에 초기 상태를 복사하여 저장
    generateRandomPokemonSet(50);
  });

  test('포켓몬 삭제하기', async () => {
    const req = {
      params: { id: 1 },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const deletedPokemonName = pokemonDataInstance.getPokemonData()[0].name
    await deletePokmons(req, res);
   
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: `굿바이 ${deletedPokemonName}!!` });
  });

  test('삭제할 포켓몬을 찾을 수 없는 경우 404 반환', async () => {
    const req = {
        params: { id: 999 },  // 존재하지 않는 ID를 사용
    };
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    };

    await deletePokmons(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: '포켓몬을 찾을 수 없습니다.' });
  });
});