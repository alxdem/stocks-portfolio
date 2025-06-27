import {IMask} from 'react-imask';
import {getCurrentYear} from '@/utils/common';
import type {MaskedPatternOptions, MaskedNumberOptions} from 'imask';

export const cardNumberOptions: MaskedPatternOptions = {
    mask: '0000 0000 0000 0000',
};

export const expDateOptions: MaskedPatternOptions = {
    mask: '{MM}/{YY}',
    blocks: {
        MM: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 12,
        },
        YY: {
            mask: IMask.MaskedRange,
            from: Number(getCurrentYear(true)),
            to: 99,
        }
    }
};

export const cvvOptions: MaskedPatternOptions = {
    mask: '000',
    displayChar: '*',
};

export const paymentOptions: MaskedNumberOptions = {
    mask: Number,
    thousandsSeparator: ' ',
    min: 100,
    max: 10000,
}