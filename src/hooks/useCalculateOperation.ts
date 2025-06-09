import {type MouseEvent, useState} from 'react';

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

    const total = price * value;

    return {value, total, reduce, increase, setValue};
};

export default useCalculateOperation;