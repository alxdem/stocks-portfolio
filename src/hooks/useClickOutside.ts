import useEventListener from '@hooks/useEventListener';

const useClickOutside = (
    refs: React.RefObject<HTMLElement | null>[],
    callback: (e: Event) => void,
): void => {
    useEventListener('click', e => {
        let isInsideClick = false;
        refs.forEach(ref => {
            if (ref.current === null || ref.current.contains(e.target as Node)) {
                isInsideClick = true;
            }
        });

        if (isInsideClick) return;

        callback(e);
    }, document);
};

export default useClickOutside;