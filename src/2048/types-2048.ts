export const valid2048InputsArr: string[] = [
    'a',
    's',
    'd',
    'f',
    'w',
    'ArrowUp',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    
];

export const tileVariants: Record<string, string> = {
    '2': 'bg-(--board-card-2) text-board-brown text-4xl',
    '4': 'bg-(--board-card-4) text-board-brown text-4xl',
    '8': 'bg-(--board-card-8) text-white text-4xl',
    '16': 'bg-(--board-card-16) text-white text-4xl',
    '32': 'bg-(--board-card-32) text-white text-4xl',
    '64': 'bg-(--board-card-64) text-white text-4xl',
    '128': 'bg-(--board-card-128) text-white text-3xl',
    '256': 'bg-(--board-card-256) text-white text-3xl',
    '512': 'bg-(--board-card-512) text-white text-3xl',
    '1024': 'bg-(--board-card-1024) text-white text-2xl',
    '2048': 'bg-(--board-card-2048) text-white text-2xl',
};

export type Direction = 'Up' | 'Down' | 'Left' | 'Right'

export const processDirection: Record<string, Direction> = {
    ArrowLeft: 'Left',
    a: 'Left',
    4: 'Left',

    ArrowRight: 'Right',
    d: 'Right',
    6: 'Right',

    ArrowDown: 'Down',
    s: 'Down',

    ArrowUp: 'Up',
    w: 'Up',
};
