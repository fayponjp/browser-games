import './guide.css';
export default function Guide() {
    return (
        <footer className='text-white w-full items-center py-4 border-t border-t-slate-600 bg-zinc-800'>
            <div className='flex flex-col items-center'>
                <h2 className='text-lg'>Quick Guide</h2>
                <ul className='list-none'>
                    <li className='guide-icon guide-correct'>Correct!</li>
                    <li className='guide-icon guide-almost'>
                        Right letter, wrong position!
                    </li>
                    <li className='guide-icon guide-incorrect'>Incorrect!</li>
                </ul>
            </div>
        </footer>
    );
}
