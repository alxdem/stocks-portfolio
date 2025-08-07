import {type MouseEvent, useState} from 'react';
import {getOperationFee} from '@utils';

const useCalculateOperation = (price: number) => {
    const [value, setValue] = useState(0);

    const reduce = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setValue(state => state - 1);
    };

    const increase = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setValue(state => state + 1);
    };

    const gross = price * value;
    const fee = getOperationFee(gross);
    const total = gross + fee;

    return {value, gross, fee, total, reduce, increase, setValue};
};

export default useCalculateOperation;