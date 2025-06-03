import {useCallback, useEffect} from 'react';

interface KeyDownCallback {
    (): void;
}

interface UseKeyDown {
    (
        callback: KeyDownCallback,
        keys: string[]
    ): void;
}

const useKeyDown: UseKeyDown = (callback, keys) => {
    const KEY_NAME = 'keydown';
    const onKeyDown = useCallback((e: KeyboardEvent) => {
        const isAnyKeyPressed = keys.some(key => e.key === key);

        if (isAnyKeyPressed) {
            e.preventDefault();
            callback();
        }
    }, [callback, keys]);

    useEffect(() => {
        document.addEventListener(KEY_NAME, onKeyDown);

        return () => {
            document.removeEventListener(KEY_NAME, onKeyDown);
        }
    }, [onKeyDown]);
};

export default useKeyDown;