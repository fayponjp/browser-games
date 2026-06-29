import { loadFromCache, saveToCache } from '../shared-utils/caching';

export async function retrievePkmnCount() {
    const storageId = 'pkmnCountKey';
    const localCount = loadFromCache(storageId);

    if (localCount) return localCount;

    try {
        const response = await fetch(
            'https://pokeapi.co/api/v2/pokemon-species/?limit=0/',
        );
        const data = await response.json();

        saveToCache(storageId, data.count);
        return data.count;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function retrievePkmnCountGraphQL() {
    const query = `
        query GetCount {
            pokemon {
                name
                pokemonsprites {
                    sprites
                }
                id
            }
        }
    `;
    const response = await fetch('https://graphql.pokeapi.co/v1beta2', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify({ query }),
    });
    const data = await response.json();
    console.log(data);
}

interface PokeAPIResponseJSON {
    id: string;
    name: string;
    sprites: {
        front_default: string;
        other: {
            'official-artwork': {
                front_default: string;
            }
        }
    };
    types: { 
        slot: number;
        type: {
            name: string;
            url: string;
        }
    }[]
}

export async function retrievePkmn() {
    const pkmnCount = await retrievePkmnCount();

    if (pkmnCount) {
        const randomPkmn = Math.floor(Math.random() * pkmnCount) + 1;
        try {
            const response = await fetch(
                `https://pokeapi.co/api/v2/pokemon/${randomPkmn}`,
            );
            const reqData = await response.json();
            const data: PokeAPIResponseJSON = reqData;

            const name = data.name;
            const src = data.sprites.front_default;
            const sprite = data.sprites.other['official-artwork'].front_default;
            const id = data.id;
            const type = data.types.map((element) => {
                return element.type.name;
            });

            return { name, src, id, sprite, type };
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}

export async function retrievePkmnByIdGraphQL(id: string) {
    const query = `
        query GetPkmnById($id: Int!) {
            pokemon(where: {id : {_eq: $id}}) {
                name
                id
                pokemonsprites {
                    sprites
                }
            }
        }
    `;

    const response = await fetch('https://graphql.pokeapi.co/v1beta2', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify({ query, variables: { id } }),
    });

    const data = await response.json();
    console.log(data);
}
