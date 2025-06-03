import {useEffect} from 'react';
import {scrollWidthGet} from '@/utils';

const useScreenFix = (isFixed: boolean) => {
    const FIX_CLASS = 'body_fixed';
    const body = document.body;

    useEffect(() => {
        if (isFixed) {
            body.classList.add(FIX_CLASS);
            body.style.paddingRight = `${scrollWidthGet()}px`;
        } else {
            body.classList.remove(FIX_CLASS);
            body.style.paddingRight = '0';
        }
    }, [isFixed]);
};

export default useScreenFix;