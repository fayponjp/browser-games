import { createFileRoute } from '@tanstack/react-router';
import LoadingIndicator from '../shared-components/loadingIndicator';
import { Landing } from '../landing/LandingMain';

export const Route = createFileRoute('/')({
    component: () => <Home />,
    pendingComponent: () => <LoadingIndicator/>,
    pendingMs: 150,
    pendingMinMs: 200,
});

// Make a video game menu style
// Mouseover highlight
// clicking just highlights, click the Play button to swap
// make Play button absolute position
function Home() {
    return (
        <div className='h-lvh grid grid-rows-[4fr_1fr] bg-(--theme-dark) text-white'>
            <Landing />
            <footer className='border-t-2 border-t-(--theme-green)/10 text-white flex max-h-30 mt-auto py-2 px-8'>
                <div className='max-w-5xl mx-auto w-full text-end text-sm py-2'>
                    © GameTryal 2026
                </div>
            </footer>
        </div>
    );
}
