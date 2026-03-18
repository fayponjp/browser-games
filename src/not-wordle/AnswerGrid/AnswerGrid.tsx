import { useEffect, useState } from 'react';
import './answergrid.css';
import clsx from 'clsx';
import type { WordleGame } from '../../utils/types';
export default function AnswerGrid({
    game,
    rowRef,
}: {
    game: WordleGame;
    rowRef: React.RefObject<null | HTMLDivElement>;
}) {
    const [rowElements, setRowElements] = useState(createRowElements());

    function createRowElements() {
        return Array(6)
            .fill(null)
            .map((_any, i) => (
                <div className='answer-grid-row' key={`row${i}`}></div>
            ));
    }

    useEffect(() => {
        setRowElements((prevRowElements) => {
            const safePrevRowElements = prevRowElements || createRowElements();
            return safePrevRowElements.map((_, index) => {
                const wordFrequency: any = {};

                game.currentWord.forEach(
                    (char: string) =>
                        (wordFrequency[char] = (wordFrequency[char] || 0) + 1),
                );

                return (
                    <div
                        className='answer-grid-row'
                        key={`row${index}`}
                        ref={
                            (game.guesses[index] &&
                                game.guesses[index].length === 5 &&
                                game.guesses.length - 1 === index &&
                                rowRef) ||
                            null
                        }
                    >
                        {Array(5)
                            .fill(null)
                            .map((_any, i) => {
                                let colorClass = null;
                                if (game.guesses[index] && index < game.guessRow) {
                                    const letter = game.guesses[index][i];
                                    if (letter === game.currentWord[i]) {
                                        colorClass = 'correct ' + `flip${i}`;
                                        wordFrequency[letter]--;
                                    } else if (
                                        game.currentWord.includes(letter) &&
                                        wordFrequency[letter] > 0
                                    ) {
                                        colorClass =
                                            'close-guess ' + `flip${i}`;
                                        wordFrequency[letter]--;
                                    } else {
                                        colorClass = 'guess ' + `flip${i}`;
                                    }
                                }

                                const popClass =
                                    game.guesses[index] &&
                                    game.guesses[index][i] &&
                                    'pop';
                                const classNames = clsx(
                                    'answer-grid-tile',
                                    colorClass,
                                    popClass,
                                );
                                return (
                                    <div
                                        className={classNames}
                                        key={`tile${index}-${i}`}
                                        style={{
                                            transitionDelay: `${i * 100}ms`,
                                        }}
                                    >
                                        {game.guesses[index]
                                            ? game.guesses[index][i] || ''
                                            : ''}
                                    </div>
                                );
                            })}
                    </div>
                );
            });
        });
    }, [game]);

    return (
        <div className='flex justify-center items-center py-2 '>
            <div className='grid grid-rows-6 w-70 h-90 gap-2'>{rowElements}</div>
        </div>
    );
}
