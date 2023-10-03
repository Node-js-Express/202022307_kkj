class PokemonData {
    constructor() {
        if (!PokemonData.instance) {
            this.injectedData = null;
            this.pokemon = this.injectedData !== null ? this.injectedData : [
                { id: 1, name: '거북왕', gender: '남', baseStats: 530, personality: '대담한'},
                { id: 2, name: '피카츄', gender: '남', baseStats: 320, personality: '촐랑거리는'},
                { id: 3, name: '쥬레곤', gender: '여', baseStats: 475, personality: '겁쟁이'},
                { id: 4, name: '라프라스', gender: '여', baseStats: 535, personality: '조심스러운'},
                { id: 5, name: '망나뇽', gender: '여', baseStats: 600, personality: '용감한'},
                { id: 6, name: '잠만보', gender: '남', baseStats: 540, personality: '무사태평한'},
            ];
            
            PokemonData.instance = this;
        }

        return PokemonData.instance;
    }

    setInjectedData(data) {
        this.pokemon = data;
    }

    getPokemonData() {
        return this.pokemon;
    }
}

export default PokemonData;
