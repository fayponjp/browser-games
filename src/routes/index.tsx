import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
    component: () => <Home />,
});

const Home = () => {
    return (
        <main className='grid mt-10 grid-rows-[auto_1fr]'>
            <h2 className='text-center py-8 text-3xl'>Games</h2>
            <div className='flex flex-row justify-evenly text-center flex-wrap gap-4'>
                <Link to='/NotWordle' className='px-4 py-4 shadow-xl rounded-xl bg-white min-w-120 max-h-110 cursor-pointer'><section >Not Wordle</section></Link>
                <Link to='/PokeHangman' className='px-4 py-4 shadow-xl rounded-xl bg-white min-w-120 max-h-110 cursor-pointer'><section >PokéHangman</section></Link>
                <Link to='/' className='px-4 py-4 shadow-xl rounded-xl bg-white min-w-120 max-h-110 cursor-pointer'><section >Coming Soon!</section></Link>
                
            </div>
        </main>
    );
};
