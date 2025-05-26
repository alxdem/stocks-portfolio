import {OperationType} from '@models';
import type {Operation} from '@models';

const operations: Operation[] = [
    { symbol: '', date: 1747917359059, price: 10000, type: OperationType.Deposit, value: 1 },
    { symbol: 'F', date: 1747917358059, price: 12.9, type: OperationType.Purchase, value: 4 },
    { symbol: 'BA', date: 1747914359059, price: 313.3, type: OperationType.Sale, value: 2 },
    { symbol: 'BAC', date: 1747947359059, price: 24.8, type: OperationType.Purchase, value: 5 },
    { symbol: 'F', date: 1747917359059, price: 12.82, type: OperationType.Purchase, value: 5 },
    { symbol: 'BA', date: 1747917359059, price: 310.1, type: OperationType.Purchase, value: 6 },
    { symbol: 'GE', date: 1747917359059, price: 112, type: OperationType.Purchase, value: 4 },
    { symbol: '', date: 1747917369059, price: 4000, type: OperationType.Withdraw, value: 1 },
    { symbol: 'INTC', date: 1747917359059, price: 39.12, type: OperationType.Purchase, value: 8 },
];

export {
    operations,
}