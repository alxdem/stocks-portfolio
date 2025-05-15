import {type Theme} from '@/models';
import {appKey} from '@utils/variables';

const getBody = () => document.querySelector('body');

const setTheme = (value: Theme) => {
    localStorage.setItem('theme', value);
    getBody()?.setAttribute(appKey.DATA_THEME, value);
};

export const themeSwitch = () => {
    const currentTheme = getBody()?.getAttribute(appKey.DATA_THEME);

    setTheme(currentTheme === 'light' ? 'dark' : 'light');
};