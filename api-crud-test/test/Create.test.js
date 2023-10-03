import { postPokemon } from '../controllers/tasks.js'
import { generateRandomPokemonSet } from '../utils/testDataGenerater.js';

describe('Create 테스트', () => {
  beforeEach(() => {
    generateRandomPokemonSet(50);
  });

  test('포켓몬 추가하기', async () => {
    const req = {
      body: {
        id: 51,
        name: '독침붕',
        gender: '남',
        baseStats: 385,
        personality: '용감한',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await postPokemon(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: '좋았어 독침붕!! 넌 내꺼야!!!' });
  });

  test('포켓몬 데이터가 부족한 경우 400 반환', async () => {
    const req = {
        body: {
            // 필수 데이터 중 하나 누락
            id: 51,
            gender: '남',
            baseStats: 385,
            personality: '용감한',
        },
    };
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    };

    await postPokemon(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: '포켓몬 데이터가 부족합니다.' });
});

test('이미 존재하는 포켓몬 ID를 사용한 경우 400 반환', async () => {
    const req = {
        body: {
            id: 1,  // 이미 존재하는 ID 사용
            name: '불효자',
            gender: '여',
            baseStats: 420,
            personality: '대담한',
        },
    };
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    };

    await postPokemon(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: '잡았던 포켓몬 입니다.' });
});

test('유효하지 않은 성격을 가진 포켓몬을 추가한 경우 400 반환', async () => {
    const req = {
        body: {
            id: 51,
            name: '용감하지 못한 포켓몬',
            gender: '남',
            baseStats: 385,
            personality: '호탕한',  // 유효하지 않은 성격
        },
    };
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    };

    await postPokemon(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: '그런 성격을 가진 포켓몬은 없습니다.' });
});

test('포켓몬의 스탯이 유효 범위를 벗어난 경우 400 반환', async () => {
    const req = {
        body: {
            id: 51,
            name: '테스트용 포켓몬',
            gender: '여',
            baseStats: 1200,  // 유효 범위를 벗어난 스탯
            personality: '무사태평한',
        },
    };
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    };

    await postPokemon(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: '포켓몬이 너무 강하거나 너무 약합니다.' });
  });

  
});