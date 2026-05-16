import type { WordleGame } from '../../utils/types-interfaces-vars';
export default function Popover({
    game,
    letters,
    word,
    popoverRef,
}: {
    game: WordleGame;
    letters: Array<Array<string>>;
    word: Array<string>;
    popoverRef: React.RefObject<null | HTMLDivElement>;
}) {
    return (
        <div popover='auto' className='rounded-sm p-2 m-auto text-center backdrop:backdrop-blur-xs' ref={popoverRef}>
            <div className='font-[NYTKarnakCondensed] text-xl p-2 border-b border-b-slate-300'>
                {game.gameWon ? 'You won!' : `It's so over...`}
            </div>
            <div className='p-2'>
                <h2>{game.gameWon ? 'Congratulations!' : `Nice effort!`}</h2>
                <div>
                    {game.gameWon
                        ? `You've guessed the word in ${
                              letters.length - 1
                          } attempts!`
                        : `The word was ${word.join('')}!`}
                </div>
            </div>
        </div>
    );
}
