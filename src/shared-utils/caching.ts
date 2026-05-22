const STORAGE_KEY = (game: string) => `re-gamestats:${game}`;

export function saveToCache<T>(game: string, stats: T): void {
    localStorage.setItem(STORAGE_KEY(game), JSON.stringify(stats));
}

export function loadFromCache<T>(game: string): T | null {
    const localStats = localStorage.getItem(STORAGE_KEY(game));
    return localStats ? (JSON.parse(localStats) as T) : null;
}