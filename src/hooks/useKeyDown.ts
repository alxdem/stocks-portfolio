import { useEffect } from 'react';

interface IKeyDownCallback {
    (): void;
}

interface IUseKeyDowm {
    (
        callback: IKeyDownCallback,
        keys: string[]
    ): void;
}

export const useKeyDowm: IUseKeyDowm = (callback, keys) => {
    const onKeyDown = (e: KeyboardEvent): void => {
        const isAnyKeyPressed = keys.some((key) => e.key === key);

        if (isAnyKeyPressed) {
            e.preventDefault();
            callback();
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', onKeyDown);

        return () => {
            document.removeEventListener('keydown', onKeyDown);
        };
    }, [callback, keys]);
};