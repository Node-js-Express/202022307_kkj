import { updatePokemons } from '../controllers/tasks.js'
import { generateRandomPokemonSet } from '../utils/testDataGenerater.js';

describe('Update 테스트', () => {
  beforeEach(() => {
    // 각 테스트가 실행되기 전에 초기 상태를 복사하여 저장
    generateRandomPokemonSet(50);
  });

  test('포켓몬 정보 업데이트하기', async () => {
    const req = {
      params: { id: 2 },
      body: {
        name: '구구',
        baseStats: 99,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  
    await updatePokemons(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: '구구의 포켓몬 정보가 업데이트 되었습니다.' });
  });
  
  test('포켓몬을 찾을 수 없는 경우 404 반환', async () => {
    const req = {
        params: { id: 999 },  // 존재하지 않는 ID
        body: {
            name: '이름 업데이트',
            baseStats: 500,
        },
    };
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    };

    await updatePokemons(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: '포켓몬을 찾을 수 없습니다.' });
});

test('이미 존재하는 ID로 업데이트 시 400 반환', async () => {
    const req = {
        params: { id: 1 },  
        body: {
            id: 2,  // 중복된 ID
            name: '이름 업데이트',
            baseStats: 500,
        },
    };
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    };

    await updatePokemons(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: '이미 존재하는 ID입니다.' });
});

test('유효하지 않은 ID로 업데이트 시 404 반환', async () => {
    const req = {
        params: { id: 'invalid-id' },  // 유효하지 않은 ID
        body: {
            name: '이름 업데이트',
            baseStats: 500,
        },
    };
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    };

    await updatePokemons(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: '포켓몬을 찾을 수 없습니다.' });
  });
});