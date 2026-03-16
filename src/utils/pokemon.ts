import { loadFromCache, saveToCache } from './caching';

export async function retrievePkmnCount() {
    const storageId = 'pkmnCountKey'
    const localCount = loadFromCache(storageId);

    if (localCount) return localCount;

    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/');
        const data = await response.json();
        
        saveToCache(storageId, data.count)
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
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomPkmn}`);
            const data = await response.json();

            return data.name;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}