import { useEffect, useRef } from 'react';

const isCustomEvent = (event: Event): event is CustomEvent => {
    return 'detail' in event;
};

const useEventListener = (
    eventType: string,
    callback: (e: Event) => void,
    element: HTMLElement | Document | Window = window,
): void => {
    const callbackRef = useRef(callback);

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        if (element === null) return;

        const handler = (e: Event) => {
            if (isCustomEvent(e)) {
                callbackRef.current(e);
            }
        };
        element.addEventListener(eventType, handler);

        return () => element.removeEventListener(eventType, handler);
    }, [eventType, element]);
};

export default useEventListener;