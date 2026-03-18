import { useEffect } from 'react';

export function useKeyhandler(
    arr: Array<any>,
    handleInput: (letterInput: string) => void,
    handleEnter: () => void,
    handleBackspace?: () => void,
) {
    const handleKeyDown = (e: KeyboardEvent): void => {
        if (isLetter(e.key)) {
            handleInput(e.key);
        } else if (e.key === 'Enter') {
            handleEnter();
        } else if (e.key === 'Backspace' && handleBackspace) {
            handleBackspace();
        }
    }
    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [...arr]);
}

export function isLetter(input: string): boolean {
    const regExp = /^[A-Za-z]$/;

    return regExp.test(input);
}