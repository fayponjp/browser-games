import { usePkmnGuessing } from '../pokemon.hooks';

const PlayerUIButtons = ({
    objKey,
    value,
}: {
    objKey: string;
    value: boolean;
}) => {
    const { updateOptions } = usePkmnGuessing();
    const handleOnClick = () => {
        updateOptions({ [objKey]: !value})
    }
    return (
        <button
            className={`option-btn p-0 cursor-pointer rounded-sm ${value ? 'active' : ''}`}
            onClick={handleOnClick}
        >
            <span className='option-facade text-xs block py-5 px-6 shadow-xs shadow-gray-700 -translate-y-2 text-white rounded-sm'>
                {objKey}
            </span>
        </button>
    );
};

export const HintButtons = () => {
    const { options } = usePkmnGuessing();
    return Object.entries(options).map(([key, value]) => {
        return <PlayerUIButtons key={key} objKey={key} value={value} />;
    });
};
