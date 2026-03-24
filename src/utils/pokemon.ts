import { loadFromCache, saveToCache } from './caching';

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

    const storageId = 'pkmnCountKey';
    const localPkmnCount = loadFromCache(storageId);

    if (localPkmnCount) return localPkmnCount;

    try {
        const response = await fetch('https://graphql.pokeapi.co/v1beta2', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({ query }),
        });
        const data = await response.json();
        return data.count;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function retrievePkmn() {
    const pkmnCount = await retrievePkmnCount();

    if (pkmnCount) {
        const randomPkmn = Math.floor(Math.random() * pkmnCount) + 1;
        try {
            const response = await fetch(
                `https://pokeapi.co/api/v2/pokemon/${randomPkmn}`,
            );
            const data = await response.json();
            const name = data.name;
            const src = data.sprites.front_default;

            return { name, src };
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}

export async function retrievePkmnByIdGraphQL() {
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

    const pkmnCount = await retrievePkmnCountGraphQL();

    if (pkmnCount) {
        const randomPkmn = Math.floor(Math.random() * pkmnCount) + 1;

        const response = await fetch('https://graphql.pokeapi.co/v1beta2', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({ query, variables: { id: randomPkmn } }),
        });

        const data = await response.json();
        const pokemon = data.data.pokemon[0];
        const name = pokemon.name;
        const src = pokemon.pokemonsprites[0].sprites.front_default;
        return {name, src}
    }
}
