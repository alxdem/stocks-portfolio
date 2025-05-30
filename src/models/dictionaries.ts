export const OperationType = {
    Purchase: 'purchase',
    Sale: 'sale',
    Withdraw: 'withdraw',
    Deposit: 'deposit',
} as const;

export const OperationColor = {
    Green: 'green',
    Red: 'red',
    Gray: 'gray',
} as const;

export const HugeNumberPower = {
    Thousand: 'K',
    Million: 'M',
    Billion: 'B',
    Trillion: 'T'
} as const;