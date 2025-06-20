import { useEffect, useState } from 'react';
import {MODAL_ANIMATION_DELAY} from '@utils';

const useModalMount = (isOpened: boolean) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        if (isOpened && !mounted) {
            setMounted(true);
        } else if (!isOpened && mounted) {
            setTimeout(() => {
                setMounted(false);
            }, MODAL_ANIMATION_DELAY);
        }
    }, [isOpened, mounted]);

    return {
        mounted
    };
}

export default useModalMount;