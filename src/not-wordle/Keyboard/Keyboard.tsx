import clsx from 'clsx';
import './keyboard.css';
import { useMemo } from 'react';
import type { WordleGame } from '../../utils/types';

const ROWS = {
    first: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    second: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    third: ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
};

type LetterStatus = 'correct' | 'close-guess' | 'guess';

export default function Keyboard({
    onClick,
    letters,
    word,
    game,
    handleBackspace,
    handleEnter,
}: {
    onClick: (input: string) => void;
    letters: Array<Array<string>>;
    word: Array<string> | string;
    game: WordleGame;
    handleBackspace: () => void;
    handleEnter: () => void;
}) {
    const letterStatuses = useMemo(() => {
        const statuses = new Map<string, LetterStatus>();

        const guessedRows = letters.slice(0, game.guessRow);
        for (const row of guessedRows) {
            for (let j = 0; j < row.length; j++) {
                const letter = row[j];
                if (letter === word[j]) {
                    statuses.set(letter, 'correct');
                } else if (word.includes(letter)) {
                    if (statuses.get(letter) !== 'correct') {
                        statuses.set(letter, 'close-guess');
                    }
                } else {
                    if (!statuses.has(letter)) {
                        statuses.set(letter, 'guess');
                    }
                }
            }
        }

        return statuses;
    }, [letters, word, game.guessRow, game.gameOver]);

    function renderKey(key: string) {
        return (
            <button
                className={clsx('key', letterStatuses.get(key))}
                key={key}
                onClick={() => onClick(key)}
            >
                {key}
            </button>
        );
    }

    return (
        <div className='flex flex-col flex-wrap gap-4 p-1'>
            <div className='key-rows'>{ROWS.first.map(renderKey)}</div>
            <div className='key-rows'>
                <div className='half-key' />
                {ROWS.second.map(renderKey)}
                <div className='half-key' />
            </div>
            <div className='key-rows'>
                <button className='key key-wide' onClick={handleEnter}>
                    ENTER
                </button>
                {ROWS.third.map(renderKey)}
                <button className='key key-wide' onClick={handleBackspace}>
                    <i className='fa-solid fa-delete-left' />
                </button>
            </div>
        </div>
    );
}
