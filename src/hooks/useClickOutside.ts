import type {RefObject} from 'react';
import useEventListener from '@hooks/useEventListener';
import type {Nullable} from '@/models';

const useClickOutside = (
    refs: RefObject<Nullable<HTMLElement>>[],
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