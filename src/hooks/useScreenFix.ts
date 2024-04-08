import { scrollWidthGet } from '@utils/utils';

export const useScreenFix = (isFixed: boolean) => {
    const body = document.querySelector('body');
    if (!body) return;

    if (isFixed) {
        body.classList.add('body_fixed');
        body.style.paddingRight = `${scrollWidthGet()}px`;
    } else {
        body.classList.remove('body_fixed');
        body.style.paddingRight = '0';
    }
};