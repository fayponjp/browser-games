import './guide.css';
export default function Guide() {
    return (
        <footer className='text-white w-full px-6 gap-2 text-xs md:text-sm py-4 border-t max-w-5xl grid grid-cols-2 m-auto border-t-(--theme-color)/10'>
            <div className='flex flex-col items-center'>
                <h2 className='font-bold'>Color Reference</h2>
                <ul className='list-none flex flex-col gap-2'>
                    <li className='guide-icon guide-correct'>Correct letter in the correct position!</li>
                    <li className='guide-icon guide-almost'>
                        Correct letter, wrong position!
                    </li>
                    <li className='guide-icon guide-incorrect'>Incorrect!</li>
                </ul>
            </div>
            <div className='flex flex-col items-center max-w-xs lg:max-w-lg m-auto'>
                <h2 className='font-bold'>How to Play</h2>
                <ul className='list-disc'>
                    <li>Guess the 5-letter word within 6 tries.</li>
                    <li>Guessed letters will have colors assigned to them.</li>
                    <li>Starting a new game will change the target word!</li>
                </ul>
            </div>
        </footer>
    );
}
