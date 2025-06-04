import {useEffect} from 'react';

const useScreenFix = (isFixed: boolean) => {
    const FIX_CLASS = 'body_fixed';
    const body = document.body;

    useEffect(() => {
        if (isFixed) {
            body.classList.add(FIX_CLASS);
        } else {
            body.classList.remove(FIX_CLASS);
        }
    }, [isFixed]);
};

export default useScreenFix;