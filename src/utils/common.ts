import type {
    Theme,
    IsStringNumber,
    GetPercent,
    FormatHugeNumber,
    Operation,
    Nullable,
    CompanyInfoData,
    GetNormalizedValue,
    ClearTimer,
} from '@models';
import {HugeNumberPower} from '@models';
import {appKey} from '@/utils/variables';

const getBody = () => document.querySelector('body');

const setTheme = (value: Theme) => {
    localStorage.setItem('theme', value);
    getBody()?.setAttribute(appKey.DATA_THEME, value);
};

const getRandomNumber = (min: number, max: number): number => {
    const minLocal = Math.ceil(min);
    const maxLocal = Math.floor(max);

    return Math.floor(Math.random() * (maxLocal - minLocal)) + minLocal;
};

export const themeSwitch = () => {
    const currentTheme = getBody()?.getAttribute(appKey.DATA_THEME);

    setTheme(currentTheme === 'light' ? 'dark' : 'light');
};

export const truncateValue = (value: number) => {
    return Math.floor((value) * 100) / 100;
}

export const fakeFetch = <T>(data: T, delay?: number): Promise<T> => {
    const min = 3;
    const max = 14;
    const factor = 100;
    const delayLocal = delay || getRandomNumber(min, max) * factor;

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, delayLocal);
    });
};

export const isStringNumber: IsStringNumber = (value) => {
    return typeof value === 'string' && !isNaN(Number(value));
};

export const getPercent: GetPercent = (basic, current) => {
    return current * 100 / basic;
};

export const getDifferencePercent: GetPercent = (basis, current) => {
    const difference = current - basis;

    return difference === 0 ? 0 : difference * 100 / basis;
};

export const formatHugeNumber: FormatHugeNumber = (value) => {
    let numberValue = 0;

    if (typeof value === 'number') {
        numberValue = value;
    } else if (isStringNumber(value)) {
        numberValue = Number(value);
    } else {
        return '';
    }

    const partK = Number(value) / 1000;
    const partM = Number(value) / 1.0e6;
    const partB = Number(value) / 1.0e9;
    const partT = Number(value) / 1.0e12;

    switch (numberValue.toString().length) {
        case 1:
        case 2:
        case 3:
        case 4:
            return `${(partK).toFixed(3) + HugeNumberPower.Thousand}`;
        case 5:
            return `${(partK).toFixed(2) + HugeNumberPower.Thousand}`;
        case 6:
            return `${(partK).toFixed(1) + HugeNumberPower.Thousand}`;
        case 7:
            return `${(partM).toFixed(3) + HugeNumberPower.Million}`;
        case 8:
            return `${(partM).toFixed(2) + HugeNumberPower.Million}`;
        case 9:
            return `${(partM).toFixed(1) + HugeNumberPower.Million}`;
        case 10:
            return `${(partB).toFixed(3) + HugeNumberPower.Billion}`;
        case 11:
            return `${(partB).toFixed(2) + HugeNumberPower.Billion}`;
        case 12:
            return `${(partB).toFixed(1) + HugeNumberPower.Billion}`;
        case 13:
            return `${(partT).toFixed(3) + HugeNumberPower.Trillion}`;
        case 14:
            return `${(partT).toFixed(2) + HugeNumberPower.Trillion}`;
        case 15:
            return `${(partT).toFixed(1) + HugeNumberPower.Trillion}`;
        default:
            return '';
    }
};

export const getCurrentYear = (isShort = false) => {
    const year = new Date().getFullYear().toString();

    if (isShort) {
        return year.slice(-2);
    }

    return year;
};

export const sortOperations = (operations: Nullable<Operation[]>) => {
    return operations
        ? [...operations].sort((a, b) => b.date - a.date)
        : [];
};

export const getCompanyFromCache = (name: string): Nullable<CompanyInfoData> => {
    const cachedData = localStorage.getItem(appKey.LS_COMPANIES);

    if (!cachedData) {
        return null;
    }

    const companies: Record<string, CompanyInfoData> = JSON.parse(cachedData);
    const info: CompanyInfoData | undefined = companies[name];

    return info || null;
};

export const setCompanyToCache = (name: string, companyInfo: CompanyInfoData) => {
    const cachedData = localStorage.getItem(appKey.LS_COMPANIES);
    const companiesObj: Record<string, CompanyInfoData> = cachedData ? JSON.parse(cachedData) : {};

    if (companiesObj[name]) {
        return;
    }

    companiesObj[name] = companyInfo;
    localStorage.setItem(appKey.LS_COMPANIES, JSON.stringify(companiesObj));
}

export const getNormalizedValue: GetNormalizedValue = (value, min, max) => {
    let localValue = value;

    if (value < min) {
        localValue = min;
    }

    if (value > max) {
        localValue = max;
    }

    return localValue;
};

export const clearTimer: ClearTimer = (ref) => {
    if (ref.current !== null) {
        clearTimeout(ref.current);
        ref.current = null;
    }
};

export const getScrollbarWidth = () => {
    const div = document.createElement('div');
    div.style.overflowY = 'scroll';
    div.style.width = '100px';
    div.style.height = '100px';
    div.style.position = 'absolute';
    div.style.top = '-9999px';

    document.body.appendChild(div);
    const scrollbarWidth = div.offsetWidth - div.clientWidth;
    document.body.removeChild(div);

    return scrollbarWidth;
};